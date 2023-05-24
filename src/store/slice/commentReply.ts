import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppState } from "@store/index";
const replyEntityAdapter = createEntityAdapter<CommentType>({
  selectId: (comment) => comment.com_id,
});
export const commentReplySlice = createSlice({
  name: "commentReply",
  initialState: replyEntityAdapter.getInitialState(),
  reducers: {
    saveCommentReply: (state, action: PayloadAction<CommentType[]>) => {
      replyEntityAdapter.addMany(state, action.payload);
    },
    clearCommentReply: (state) => {
      replyEntityAdapter.removeAll(state);
    },
  },
});
export const replySelector = replyEntityAdapter.getSelectors<AppState>(
  (state) => state.commentReply
);
export const { saveCommentReply, clearCommentReply } =
  commentReplySlice.actions;
