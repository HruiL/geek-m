import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "@styles/article.module.less";
import Back from "@shared/back";
import GeekIcon from "@shared/geekIcon";
import { Skeleton } from "antd-mobile";
import { useParams } from "react-router-dom";
import {
  useRequestArticleCommentMutation,
  useRequestArticleDetailQuery,
} from "@service/article";
import "highlight.js/styles/atom-one-dark.css";
import dayjs from "dayjs";
import CommentItem from "@pages/article/widgets/commentItem";
import FollowBtn from "@pages/article/widgets/followBtn";
import Like from "./widgets/like";
import Collect from "@pages/article/widgets/collect";
import { useTypedDispatch, useTypedSelector } from "@store/index";
import { clearComment, commentSelector, saveComment } from "@slice/comment";
import Infinite from "@shared/infinite";
import PubComment from "@pages/article/widgets/pubComment";
function Article() {
  const { id } = useParams();
  const { data, isSuccess } = useRequestArticleDetailQuery(id!);
  // 头部作者信息 滚动的元素
  const scrollHeaderRef = useRef<HTMLDivElement | null>(null);
  // 控制 头部作者信息是否显示
  const [isShow, setIsShow] = useState(false);
  // 底部评论区的元素
  const commentRef = useRef<HTMLDivElement | null>(null);
  // 文章列表元素
  const articleRef = useRef<HTMLDivElement | null>(null);
  // 点击评论按钮，是显示内容区，还是显示显示评论区
  const [flag, setFlag] = useState(false);
  // 是否还有更多数据可以加载
  const [hasMore, setHasMore] = useState(true);
  // 请求数据时的偏移量
  const [offset, setOffset] = useState<string | undefined>();
  const dispatch = useTypedDispatch();
  // 监听flag，设置页面滚动
  useEffect(() => {
    articleRef.current?.scrollTo({
      top: flag ? commentRef.current?.offsetTop : 0,
      behavior: "smooth",
    });
    return () => {
      dispatch(clearComment());
    };
  }, [dispatch, flag]);
  // 获取请求文章评论的方法
  const [requestArticleComment] = useRequestArticleCommentMutation();
  // 获取所有评论
  const allComments = useTypedSelector(commentSelector.selectAll);
  const loadMore = () => {
    return requestArticleComment({
      type: "a",
      source: id!,
      limit: 10,
      offset,
    })
      .unwrap()
      .then((res) => {
        // 保存数据到本地
        dispatch(saveComment(res.data.results));
        // 判断是否还有更多数据
        setHasMore(res.data.end_id !== res.data.last_id);
        // 设置请求下一页评论的offset
        setOffset(res.data.last_id);
      });
  };
  // 重置文章评论,清空本地数据，获取最新数据
  const resetComment = useCallback(() => {
    setOffset(undefined);
    setHasMore(true);
    dispatch(clearComment());
  }, [dispatch]);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Back />
          {isShow && isSuccess && (
            <div className={styles.center}>
              <img src={data.data.aut_photo} alt="" />
              <span>{data.data.aut_name}</span>
              <button>关注</button>
            </div>
          )}
        </div>
        <GeekIcon type={"icongengduo"} className={styles.more} />
      </div>
      <div
        className={styles.article}
        onScroll={(event) =>
          setIsShow(
            event.currentTarget.scrollTop >
              (scrollHeaderRef.current?.offsetHeight || 0)
          )
        }
        ref={articleRef}
      >
        {!isSuccess && (
          <div className={styles.skeleton}>
            <Skeleton.Paragraph lineCount={2} animated />
            <Skeleton.Paragraph lineCount={3} animated />
            <Skeleton.Paragraph lineCount={5} animated />
            <Skeleton.Paragraph lineCount={2} animated />
            <Skeleton.Paragraph lineCount={4} animated />
          </div>
        )}
        {isSuccess && (
          <>
            <div ref={scrollHeaderRef}>
              <h2 className={styles.title}>{data.data.title}</h2>
              <div className={styles.meta}>
                <span>{dayjs(data.data.pubdate).format("YYYY-MM-DD")}</span>
                <span>{data.data.read_count} 阅读</span>
                <span>{data.data.comm_count} 评论</span>
              </div>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <img src={data.data.aut_photo} alt="" />
                  <span>{data.data.aut_name}</span>
                </div>
                <FollowBtn
                  isFollow={data.data.is_followed}
                  useId={data.data.aut_id}
                />
              </div>
            </div>
            <div className={styles.content}>
              <div
                dangerouslySetInnerHTML={{ __html: data.data.content }}
              ></div>
              <div className={styles.footnote}>
                文章发布于：{dayjs(data.data.pubdate).format("YYYY-MM-DD")}
              </div>
            </div>
          </>
        )}
        <div className={styles.comment} ref={commentRef}>
          <h4 className={styles.title}>
            全部评论 ({allComments?.length || 0})
          </h4>
          {!allComments && (
            <div className={styles.noReply}>
              <img src={require("@images/none.png")} alt="" />
              <span>还没有人评论哦</span>
            </div>
          )}
          {allComments &&
            allComments.map((comment) => (
              <CommentItem
                key={comment.com_id}
                comment={comment}
                resetComment={resetComment}
              />
            ))}
          <Infinite hasMore={hasMore} loadMore={loadMore} />
        </div>
      </div>
      {isSuccess && (
        <div className={styles.bar}>
          <PubComment id={id!} resetComment={resetComment} />
          <div className={styles.icons}>
            <div className={styles.item} onClick={() => setFlag(!flag)}>
              <GeekIcon type={"iconbtn_comment"} />
              <span>评论</span>
            </div>
            <Like
              isLiked={data.data.attitude === 1}
              art_id={data.data.art_id}
            />
            <Collect
              isCollect={data?.data.is_collected}
              art_id={data?.data.art_id}
            />
            <div className={styles.item}>
              <GeekIcon type={"iconbtn_share"} />
              <span>分享</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Article;
