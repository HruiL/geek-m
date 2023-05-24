import React from "react";
import styles from "@styles/article.module.less";
import GeekIcon from "@shared/geekIcon";
import {
  useLikeArticleMutation,
  useUnLikedArticleMutation,
} from "@service/article";
interface Props {
  isLiked: boolean;
  art_id: string;
}
function Like({ isLiked, art_id }: Props) {
  const [likeArticle] = useLikeArticleMutation();
  const [unLikeArticle] = useUnLikedArticleMutation();
  return (
    <div
      className={styles.item}
      onClick={() =>
        isLiked ? unLikeArticle(art_id) : likeArticle({ target: art_id })
      }
    >
      {isLiked ? (
        <GeekIcon type={"iconbtn_like_sel"} />
      ) : (
        <GeekIcon type={"iconbtn_like2"} />
      )}

      <span>点赞{isLiked}</span>
    </div>
  );
}

export default Like;
