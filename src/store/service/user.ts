import { apiService } from "@service/index";
import { saveUser } from "@slice/user";

export const userApiService = apiService
  .enhanceEndpoints({ addTagTypes: ["profile", "article"] })
  .injectEndpoints({
    endpoints: (build) => ({
      // 获取用户资料
      getUserProfile: build.query<UserProfileResponse, undefined>({
        query: () => ({
          url: "/user/profile",
          method: "get",
        }),
        providesTags: ["profile"],
        async onQueryStarted(arg, api) {
          const response = await api.queryFulfilled;
          api.dispatch(saveUser(response.data.data));
        },
      }),
      // 获取用户信息
      requestUser: build.query<UserProfileResponse, undefined>({
        query: () => ({
          url: "/user",
          method: "get",
        }),
        extraOptions: {},
      }),
      //  修改头像
      uploadAvatar: build.mutation<UploadAvatarResponse, FormData>({
        query: (body) => ({
          url: "/user/photo",
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["profile"],
      }),
      // 修改用户个人资料
      updateProfile: build.mutation<GeekResponse<null>, Partial<UserProfile>>({
        query: (body) => ({
          url: "/user/profile",
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["profile"],
      }),
      // 关注用户
      followUser: build.mutation<
        GeekResponse<{ target: string }>,
        { target: string }
      >({
        query: (body) => ({
          url: "/user/followings",
          method: "POST",
          body,
        }),
        invalidatesTags: ["article"],
      }),
      // 取消关注用户
      unFollowUser: build.mutation({
        query: (id: string) => ({
          url: `/user/followings/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["article"],
      }),
    }),
  });
export const {
  useLazyGetUserProfileQuery,
  useRequestUserQuery,
  useGetUserProfileQuery,
  useUploadAvatarMutation,
  useUpdateProfileMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
} = userApiService;
