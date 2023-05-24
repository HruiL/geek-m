import { apiService } from "@service/index";

export const newsService = apiService.injectEndpoints({
  endpoints: (build) => ({
    // 获取文章列表
    requestNews: build.mutation<NewsResponse, RequestNewsParams>({
      query: (params) => ({
        url: "/articles",
        params,
      }),
    }),
  }),
});
export const { useRequestNewsMutation } = newsService;
