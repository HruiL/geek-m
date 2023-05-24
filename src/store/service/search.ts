import { apiService } from "@service/index";

export const searchService = apiService.injectEndpoints({
  endpoints: (build) => ({
    // 获取搜索建议
    requestSuggest: build.query<SuggestResponse, string>({
      query: (q) => ({
        url: "/suggestion",
        params: { q },
      }),
    }),
    // 获取搜索结果
    requestSearchResult: build.mutation<SearchResult, RequestResultParams>({
      query: (params) => ({ url: "/search", params }),
    }),
  }),
});

export const { useLazyRequestSuggestQuery, useRequestSearchResultMutation } =
  searchService;
