import React from "react";
import styles from "@styles/news.module.less";
import { Link, useNavigate } from "react-router-dom";
import GeekIcon from "@shared/geekIcon";
import classNames from "classnames";
import dayjs from "dayjs";
interface Props {
  news: News;
}
function NewItem({ news }: Props) {
  const { title, cover, aut_name, pubdate, comm_count } = news;
  const navigate = useNavigate();
  return (
    <li
      className={classNames({
        [styles.hasOnePicture]: cover.type === 1,
        [styles.hasMorePicture]: cover.type > 1,
      })}
      onClick={() => navigate(`/article/${news.art_id}`)}
    >
      <div className={styles.main}>
        <Link className={styles.title} to={"/"}>
          {title}
        </Link>
        {cover.type !== 0 && (
          <Link className={styles.imgContainer} to={"/"}>
            {cover.images.map((img, index) => (
              <img src={img} alt="" key={index} />
            ))}
          </Link>
        )}
      </div>
      <div className={styles.secondary}>
        <Link to={"/"} className={styles.meta}>
          <span className={styles.item}>{aut_name}</span>
          <span className={styles.item}>{comm_count}评论</span>

          <span className={styles.item}>{dayjs().to(dayjs(pubdate))}</span>
        </Link>
        <GeekIcon type={"iconbtn_channel_close"} className={styles.close} />
      </div>
    </li>
  );
}

export default NewItem;
