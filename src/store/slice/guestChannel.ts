import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AppState } from "@store/index";
// 访客频道是列表，所以用实体适配器
const guestChannelEntityAdapter = createEntityAdapter<Channel>();
export const guestChannelSlice = createSlice({
  name: "guestChannel",
  initialState: guestChannelEntityAdapter.getInitialState(),
  reducers: {
    // 保存访客频道列表
    saveGuestChannels(state, action: PayloadAction<Channel[]>) {
      guestChannelEntityAdapter.setAll(state, action.payload);
    },
    // 删除访客频道
    deleteGuestChannel(state, action: PayloadAction<number>) {
      guestChannelEntityAdapter.removeOne(state, action.payload);
    },
    // 添加访客频道
    // 写法一
    // addGuestChannel(state, action: PayloadAction<Channel>) {
    //   guestChannelEntityAdapter.addOne(state, action.payload);
    // },
    // 写法二
    addGuestChannel: guestChannelEntityAdapter.addOne,
  },
});
// 访客对频道的操作是基于本地存储的，所以需要持久化到本地
export const guestChannelPersist = persistReducer(
  { key: "guestChannel", storage },
  guestChannelSlice.reducer
);
export const guestChannelSelector =
  guestChannelEntityAdapter.getSelectors<AppState>(
    (state) => state.guestChannel
  );
export const { saveGuestChannels, deleteGuestChannel, addGuestChannel } =
  guestChannelSlice.actions;
