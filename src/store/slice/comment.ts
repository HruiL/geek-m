import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppState } from "@store/index";
const commentEntityAdapter = createEntityAdapter<CommentType>({
  selectId: (comment) => comment.com_id,
});
export const commentSlice = createSlice({
  name: "comment",
  initialState: commentEntityAdapter.getInitialState(),
  reducers: {
    // 保存文章评论
    saveComment(state, action: PayloadAction<CommentType[]>) {
      commentEntityAdapter.addMany(state, action.payload);
    },
    // 清空文章评论
    clearComment(state) {
      commentEntityAdapter.removeAll(state);
    },
  },
});
export const commentSelector = commentEntityAdapter.getSelectors<AppState>(
  (state) => state.comment
);
export const { saveComment, clearComment } = commentSlice.actions;
