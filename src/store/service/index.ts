import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppState } from "@store/index";
import { resetCredential, saveCredential } from "@slice/credential";
const request = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  // 参数一headers是请求头配置对象 参数二api提供了getState和dispatch等工具方法
  prepareHeaders: (headers, { getState }) => {
    // 1. 判断请求头中有没有配置token（比如某些请求已经单独配置了请求头）如果有了直接返回
    if (headers.has("Authorization")) return headers;
    // 2. 获取本地token
    const token = (getState() as AppState).credential.token;
    // 3. 如果本地token存在，则添加到请求头中
    if (token) headers.set("Authorization", `Bearer ${token}`);
    // 4. 无论本地token存在与否，都得返回headers配置
    return headers;
  },
});
export const apiService = createApi({
  reducerPath: "apiReducer",
  // 和请求相关的配置找baseQuery，项目中的每个请求都会走这个地方
  // baseQuery接受一个异步函数，我们可以将异步函数fetchBaseQuery提出去，自己写一个异步函数，在自己的异步函数中调用fetchBaseQuery
  // fetchBaseQuery接受三个参数
  // 参数一 args：请求的配置对象，请求地址，请求方式，请求参数等
  // 参数二 api 功能方法比如dispatch getState
  // 参数三 extraOptions 请求的额外参数
  baseQuery: async (args, api, extraOptions) => {
    // 无论请求成功还是失败，request的状态都是fulfilled，所以我们需要手动判断请求的状态
    // 请求失败{ error:{},meta:{} } error 存储的错误信息，meta存储的是请求对象和响应对象
    // 请求成功{ data:{},meta:{} } data 存储的成功的响应信息，meta存储的是请求对象和响应对象
    const response = await request(args, api, extraOptions);
    // 1.如果有错误并且状态码是401，token失效
    if (
      typeof response.error !== "undefined" &&
      response.error.status === 401
    ) {
      // 获取路由对象
      const router = require("@router/index").router;
      // 获取路径已经路径相关的参数
      const { pathname, search, hash } = router.state.location;
      // 2.获取本地refresh_token
      const refresh_token = (api.getState() as AppState).credential
        .refresh_token;
      // 3. 如果本地有refresh_token
      if (typeof refresh_token !== "undefined") {
        // 3.1 发送刷新token的请求，换取新的token
        const response = await request(
          {
            url: "/authorizations",
            method: "PUT",
            headers: { Authorization: `Bearer ${refresh_token}` },
          },
          api,
          extraOptions
        );
        // 3.2 如果新的token获取成功，则保存新的token到本地
        if (typeof response.error === "undefined") {
          const token = (response.data as GeekResponse<{ token: string }>).data
            .token;
          api.dispatch(
            saveCredential({ token: token, refresh_token: refresh_token })
          );
          // 拿到新的token，发送原始请求
          return request(args, api, extraOptions);
        } else {
          // 3.3 如果没有获取到新的token 跳转到登录页,并携带请求参数
          // 清理本地信息
          api.dispatch(resetCredential());
          router.navigate(
            { pathname: "/login" },
            { state: { from: pathname + search + hash }, replace: true }
          );
        }
        //  4. 如果本地没有refresh_token 跳转到登录页，并携带请求参数
      } else {
        api.dispatch(resetCredential());
        router.navigate(
          { pathname: "/login" },
          { state: { from: pathname + search + hash }, replace: true }
        );
      }
    }
    return response;
  },
  endpoints: () => ({}),
});
