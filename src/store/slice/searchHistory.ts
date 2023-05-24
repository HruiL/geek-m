import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppState } from "@store/index";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const searchHistoryEntityAdapter = createEntityAdapter<SearchKey>();
export const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: searchHistoryEntityAdapter.getInitialState(),
  reducers: {
    // 保存搜索结果
    addOneSearchHistory(state, action: PayloadAction<{ name: string }>) {
      searchHistoryEntityAdapter.addOne(state, {
        name: action.payload.name,
        id: nanoid(),
      });
    },
    // 删除一条搜索结果
    deleteOneSearchHistory(state, action: PayloadAction<{ id: string }>) {
      searchHistoryEntityAdapter.removeOne(state, action.payload.id);
    },
    // 删除多条搜索结果
    deleteAllSearchHistory(state) {
      searchHistoryEntityAdapter.removeAll(state);
    },
  },
});
// 获取实体适配器中的选择器
export const searchHistorySelector =
  searchHistoryEntityAdapter.getSelectors<AppState>(
    (state) => state.searchHistory
  );
// 实现持久化
export const searchHistoryPersist = persistReducer(
  { key: "searchHistory", storage },
  searchHistorySlice.reducer
);
export const {
  addOneSearchHistory,
  deleteOneSearchHistory,
  deleteAllSearchHistory,
} = searchHistorySlice.actions;
