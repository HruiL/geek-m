import React from "react";
import styles from "@styles/article.module.less";
import GeekIcon from "@shared/geekIcon";
interface Props {
  item: CommentType;
}
function ReplyItem({ item }: Props) {
  return (
    <div className={styles.item}>
      <div className={styles.commentator}>
        <div className={styles.avatar}>
          <img src={item.aut_photo} alt="" />
          <span>{item.aut_name}</span>
        </div>
        <div className={styles.like}>
          <span>{item.like_count}</span>
          {item.is_liking ? (
            <GeekIcon type={"iconbtn_like2_sel"} />
          ) : (
            <GeekIcon type={"iconbtn_like"} />
          )}
        </div>
      </div>
      <div className={styles.discuss}>{item.content}</div>
    </div>
  );
}

export default ReplyItem;
