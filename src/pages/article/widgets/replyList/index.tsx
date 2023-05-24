import React, { useCallback, useEffect, useState } from "react";
import GeekIcon from "@shared/geekIcon";
import Header from "@shared/header";
import { SlideRef } from "@shared/slide";
import classNames from "classnames";
import styles from "@styles/article.module.less";
import dayjs from "dayjs";
import Collect from "@pages/article/widgets/collect";
import ReplyItem from "../replyItem";
import ReplyComment from "../replyComment";
import { useRequestArticleCommentMutation } from "@service/article";
import { useTypedDispatch, useTypedSelector } from "@store/index";
import {
  clearCommentReply,
  replySelector,
  saveCommentReply,
} from "@slice/commentReply";
import Infinite from "@shared/infinite";
interface Props {
  comment: CommentType;
  slideRef: React.RefObject<SlideRef>;
  resetComment: () => void;
}
function ReplyList({ comment, slideRef, resetComment }: Props) {
  const [requestReply, { data }] = useRequestArticleCommentMutation();
  const [offset, setOffset] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useTypedDispatch();
  // 请求评论的回复
  const loadReplyComments = useCallback(() => {
    requestReply({ type: "c", source: comment.com_id })
      .unwrap()
      .then((res) => {
        dispatch(saveCommentReply(res.data.results));
      });
  }, [comment.com_id, dispatch, requestReply]);
  // 页面挂载完成，发起请求
  // 页面卸载之后，清空本地评论回复
  useEffect(() => {
    loadReplyComments();
    return () => {
      dispatch(clearCommentReply());
    };
  }, [dispatch, loadReplyComments, resetComment]);
  const loadMore = () => {
    return requestReply({
      type: "c",
      source: comment.com_id,
      offset,
      limit: 10,
    })
      .unwrap()
      .then((res) => {
        setOffset(res.data.last_id);
        setHasMore(res.data.last_id !== res.data.end_id);
        dispatch(saveCommentReply(res.data.results));
      });
  };
  // 获取所有的评论回复列表
  const replyList = useTypedSelector(replySelector.selectAll);
  // 请求本地评论回复列表
  const resetCommentPlay = () => {
    setOffset(undefined);
    setHasMore(true);
    dispatch(clearCommentReply());
  };
  return (
    <>
      <Header
        title={`${comment.reply_count}条回复`}
        left={
          <GeekIcon
            type={"iconfanhui"}
            style={{ width: "4.5333vw", height: "4.5333vw" }}
            onClick={() => {
              // 关闭弹层
              slideRef.current?.close();
              resetComment();
            }}
          />
        }
      />
      <div className={classNames(styles.article, styles.replyList)}>
        <div className={styles.comment}>
          <div className={styles.item}>
            <div className={styles.commentator}>
              <div className={styles.avatar}>
                <img src={comment.aut_photo} alt="" />
                <span>{comment.aut_name}</span>
              </div>
              <button className={styles.attention}>关注</button>
            </div>
            <div className={styles.discuss}>{comment.content}</div>
            <div className={styles.bottom}>
              <div className={styles.reply}>
                <span>{dayjs().to(dayjs(comment.pubdate))}</span>
              </div>
              <div className={styles.like}>
                <span>{comment.like_count}</span>
                <GeekIcon type={"iconbtn_like"} />
              </div>
            </div>
          </div>
          <h4 className={styles.title}>全部评论 ({data?.data.total_count})</h4>
          {replyList.map((item) => (
            <ReplyItem key={item.com_id} item={item} />
          ))}
          <Infinite hasMore={hasMore} loadMore={loadMore} />
        </div>
      </div>
      <div className={styles.bar}>
        <ReplyComment
          com_id={comment.com_id}
          name={comment.aut_name}
          resetCommentPlay={resetCommentPlay}
        />
        <div className={styles.icons}>
          <Collect isCollect={false} art_id={comment.com_id} />
          <div className={styles.item}>
            <GeekIcon type={"iconbtn_share"} />
            <span>分享</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReplyList;
