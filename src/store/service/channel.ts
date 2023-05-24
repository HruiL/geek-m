import { apiService } from "@service/index";
import { saveGuestChannels } from "@slice/guestChannel";

const channelService = apiService
  .enhanceEndpoints({ addTagTypes: ["userChannel"] })
  .injectEndpoints({
    // 获取用户频道列表
    endpoints: (build) => ({
      requestUserChannels: build.query<ChannelResponse, undefined>({
        query: () => ({
          url: "/user/channels",
        }),
        providesTags: ["userChannel"],
      }),
      // 获取访客频道列表
      requestGuestChannels: build.query({
        query: () => ({
          url: "/user/channels",
        }),
        // 请求成功后保存访客频道列表
        async onQueryStarted(arg, api) {
          const response = await api.queryFulfilled;
          api.dispatch(saveGuestChannels(response.data.data.channels));
        },
      }),
      // 删除用户频道
      deleteUserChannel: build.mutation<GeekResponse<null>, string>({
        query: (id) => ({
          url: `/user/channels/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["userChannel"],
      }),
      // 获取所有频道列表
      requestAllChannel: build.query<ChannelResponse, undefined>({
        query: () => ({ url: "/channels" }),
      }),
      // 添加用户频道列表
      addUserChannel: build.mutation<
        ChannelResponse,
        { channels: [{ id: number; seq: number }] }
      >({
        query: (body) => ({
          url: "/user/channels",
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["userChannel"],
      }),
    }),
  });
export const {
  useRequestUserChannelsQuery,
  useLazyRequestGuestChannelsQuery,
  useDeleteUserChannelMutation,
  useRequestAllChannelQuery,
  useAddUserChannelMutation,
} = channelService;
