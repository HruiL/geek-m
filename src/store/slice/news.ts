import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@store/index";
// 把所有的频道都加载到同一个字典中
// 把某一个频道下的所有页数据存在同一个对象数组中
interface ChannelNews {
  results: News[];
  pre_timestamp: string | null;
  distance: number;
}
// 状态切片保存的状态类型
interface NewsReducerState {
  [cid: string]: ChannelNews;
}

export const newsSlice = createSlice<
  NewsReducerState,
  {
    saveNews: (
      state: Draft<NewsReducerState>,
      action: PayloadAction<{
        cid: string;
        results: News[];
        pre_timestamp: string | null;
      }>
    ) => void;
    saveScrollDistance: (
      state: Draft<NewsReducerState>,
      action: PayloadAction<{ cid: number; distance: number }>
    ) => void;
  },
  "newsReducer"
>({
  name: "newsReducer",
  initialState: {},
  reducers: {
    // 保存频道的文章列表
    saveNews(state, action) {
      const { cid, pre_timestamp, results } = action.payload;
      // 如果是第一次存储，直接存储
      if (typeof state[cid] === "undefined") {
        state[cid] = {
          results,
          pre_timestamp,
          distance: 0,
        };
        // 如果不是第一次存储，就累加数据
      } else {
        state[cid] = {
          results: [...state[cid].results, ...results],
          pre_timestamp,
          distance: state[cid].distance,
        };
      }
    },
    // 保存频道新闻滚动位置
    saveScrollDistance(state, action) {
      state[action.payload.cid].distance = action.payload.distance;
    },
  },
});
export const channelNewsSelector =
  (cid: string) =>
  (state: AppState): ChannelNews | undefined =>
    state.newsReducer[cid];

export const { saveNews, saveScrollDistance } = newsSlice.actions;
