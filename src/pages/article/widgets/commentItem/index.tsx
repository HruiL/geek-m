import React, { useRef } from "react";
import styles from "@styles/article.module.less";
import GeekIcon from "@shared/geekIcon";
import dayjs from "dayjs";
import Slide, { SlideRef } from "@shared/slide";
import ReplyList from "@pages/article/widgets/replyList";
interface Props {
  comment: CommentType;
  resetComment: () => void;
}
function CommentItem({ comment, resetComment }: Props) {
  const slideRef = useRef<SlideRef | null>(null);

  return (
    <div className={styles.item}>
      <div className={styles.commentator}>
        <div className={styles.avatar}>
          <img src={comment.aut_photo} alt="" />
          <span>{comment.aut_name}</span>
        </div>
        <div className={styles.like}>
          <span>{comment.like_count}</span>
          {comment.is_liking ? (
            <GeekIcon type={"iconbtn_like_sel"} />
          ) : (
            <GeekIcon type={"iconbtn_like2"} />
          )}
        </div>
      </div>
      <div className={styles.discuss}>{comment.content}</div>
      <div className={styles.bottom}>
        <div className={styles.reply}>
          <button onClick={() => slideRef.current?.open()}>
            {comment.reply_count}回复 &gt;
          </button>
          <Slide direction={"toLeft"} ref={slideRef}>
            <ReplyList
              comment={comment}
              slideRef={slideRef}
              resetComment={resetComment}
            />
          </Slide>
          <span>{dayjs().to(dayjs(comment.pubdate))}</span>
        </div>
        <GeekIcon type={"iconbtn_essay_close"} className={styles.close} />
      </div>
    </div>
  );
}

export default CommentItem;
