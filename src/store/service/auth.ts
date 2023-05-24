import { apiService } from "@service/index";
import { LoginFormState } from "@pages/login";
import { saveCredential } from "@slice/credential";

const authApiService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // 用户登录注册
    login: builder.mutation<LoginResponse, LoginFormState>({
      query: (body) => ({
        url: "/authorizations",
        method: "post",
        body,
      }),
      // 登录成功后将用户登录凭据保存到本地redux store中，以前是将这个逻辑写在了组件中，现在写在这里是为了让组件的功能更加单一，只是渲染视图，将于视图相关的逻辑抽离出来
      // onQueryStarted执行时机是：请求开始发送时
      onQueryStarted: async (arg, api) => {
        // queryFulfilled 请求对应的promise对象（永远都是成功态）
        // 等待请求发送完成
        try {
          const response = await api.queryFulfilled;
          // 保存登录凭据
          api.dispatch(saveCredential(response.data.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // 发送短信验证码
    sendMsgCode: builder.query<GeekResponse<null>, string>({
      query: (mobile) => ({
        url: `/sms/codes/${mobile}`,
      }),
    }),
  }),
});
export const { useLoginMutation, useLazySendMsgCodeQuery } = authApiService;
