import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "@store/service";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { credentialSlice, persistCredentialReducer } from "@slice/credential";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { persistUserReducer, userSlice } from "@slice/user";
import { guestChannelPersist, guestChannelSlice } from "@slice/guestChannel";
import { newsSlice } from "@slice/news";
import { searchHistoryPersist, searchHistorySlice } from "@slice/searchHistory";
import { searchSlice } from "@slice/search";
import { commentSlice } from "@slice/comment";
import { commentReplySlice } from "@slice/commentReply";

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    [credentialSlice.name]: persistCredentialReducer,
    [userSlice.name]: persistUserReducer,
    [guestChannelSlice.name]: guestChannelPersist,
    [newsSlice.name]: newsSlice.reducer,
    [searchHistorySlice.name]: searchHistoryPersist,
    [searchSlice.name]: searchSlice.reducer,
    [commentSlice.name]: commentSlice.reducer,
    [commentReplySlice.name]: commentReplySlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiService.middleware),
});
// 获取dispatch可以接收的action对象的类型
type AppDispatch = typeof store.dispatch;
// 封装一个带类型的dispatch方法
export const useTypedDispatch = () => useDispatch<AppDispatch>();
// 获取store中保存的状态的类型
export type AppState = ReturnType<typeof store.getState>;
// 封装一个带类型的状态选择器
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
