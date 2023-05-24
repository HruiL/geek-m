import { apiService } from "@service/index";

const articleService = apiService
  .enhanceEndpoints({ addTagTypes: ["article"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // 获取文章详情
      requestArticleDetail: builder.query<ArticleResponse, string>({
        query: (id) => ({ url: `/articles/${id}` }),
        providesTags: ["article"],
      }),
      // 对文章点赞
      likeArticle: builder.mutation<
        GeekResponse<{ target: string }>,
        { target: string }
      >({
        query: (body) => ({
          url: "/article/likings",
          method: "POST",
          body,
        }),
        invalidatesTags: ["article"],
      }),
      // 取消对文章点赞
      unLikedArticle: builder.mutation({
        query: (id: string) => ({
          url: `/article/likings/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["article"],
      }),
      // 收藏文章
      collectArticle: builder.mutation<
        GeekResponse<{ target: string }>,
        { target: string }
      >({
        query: (body) => ({
          url: "/article/collections",
          method: "POST",
          body,
        }),
        invalidatesTags: ["article"],
      }),
      // 对文章取消收藏
      unCollectArticle: builder.mutation({
        query: (id: string) => ({
          url: `/article/collections/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["article"],
      }),
      // 获取文章评论或评论的回复
      requestArticleComment: builder.mutation<CommentResponse, ReqParams>({
        query: (params) => ({
          url: "/comments",
          params,
        }),
      }),
      // 对文章或者评论进行评论
      pubCommentToArticle: builder.mutation<
        GeekResponse<{ com_id: string; target: string; art_id: string }>,
        { target: string; content: string; art_id?: string }
      >({
        query: (body) => ({
          url: "/comments",
          method: "POST",
          body,
        }),
        invalidatesTags: ["article"],
      }),
    }),
  });
export const {
  useRequestArticleDetailQuery,
  useLikeArticleMutation,
  useUnLikedArticleMutation,
  useCollectArticleMutation,
  useUnCollectArticleMutation,
  useRequestArticleCommentMutation,
  usePubCommentToArticleMutation,
} = articleService;
