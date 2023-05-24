import {
  createEntityAdapter,
  createSlice,
  Draft,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppState } from "@store/index";
const searchResultEntityAdapter = createEntityAdapter<News>({
  selectId: (news) => news.art_id,
});
export const searchSlice = createSlice<
  EntityState<News>,
  {
    saveSearchResult(
      state: Draft<EntityState<News>>,
      action: PayloadAction<News[]>
    ): void;

    clearSearchResult(state: Draft<EntityState<News>>): void;
  },
  "searchResult"
>({
  name: "searchResult",
  initialState: searchResultEntityAdapter.getInitialState(),
  reducers: {
    // 保存搜索结果
    saveSearchResult(state, action) {
      searchResultEntityAdapter.addMany(state, action.payload);
    },
    // 清空搜索结果
    clearSearchResult(state) {
      searchResultEntityAdapter.removeAll(state);
    },
  },
});
// 实体适配器的选择器
export const searchResultSelector =
  searchResultEntityAdapter.getSelectors<AppState>(
    (state) => state.searchResult
  );
// 状态切片中的action函数
export const { saveSearchResult, clearSearchResult } = searchSlice.actions;
