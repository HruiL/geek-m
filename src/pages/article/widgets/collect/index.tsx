import React from "react";
import styles from "@styles/article.module.less";
import GeekIcon from "@shared/geekIcon";
import {
  useCollectArticleMutation,
  useUnCollectArticleMutation,
} from "@service/article";
interface Props {
  isCollect: boolean;
  art_id: string;
}
function Collect({ isCollect, art_id }: Props) {
  const [collectArticle] = useCollectArticleMutation();
  const [unCollectArticle] = useUnCollectArticleMutation();
  return (
    <div
      className={styles.item}
      onClick={() =>
        isCollect
          ? unCollectArticle(art_id)
          : collectArticle({ target: art_id })
      }
    >
      {isCollect ? (
        <GeekIcon type={"iconbtn_collect_sel"} />
      ) : (
        <GeekIcon type={"iconbtn_collect"} />
      )}
      <span>收藏</span>
    </div>
  );
}

export default Collect;
