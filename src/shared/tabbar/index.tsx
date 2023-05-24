import React from "react";
import styles from "@styles/tabbar.module.less";
import { Link, useLocation, useParams } from "react-router-dom";
import GeekIcon from "@shared/geekIcon";
import classNames from "classnames";
function Tabbar() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  return (
    <div className={styles.tabbar}>
      <Link
        to={"/"}
        className={classNames({ [styles.active]: typeof cid !== "undefined" })}
      >
        <GeekIcon
          type={
            typeof cid !== "undefined" ? "iconbtn_home_sel" : "iconbtn_home"
          }
          className={styles.icon}
        />
        <span>首页</span>
      </Link>
      <Link
        to={"/question"}
        className={classNames({ [styles.active]: pathname === "/question" })}
      >
        <GeekIcon
          type={pathname === "/question" ? "iconbtn_qa_sel" : "iconbtn_qa"}
          className={styles.icon}
        />
        <span>问答</span>
      </Link>
      <Link
        to={"/video"}
        className={classNames({ [styles.active]: pathname === "/video" })}
      >
        <GeekIcon
          type={pathname === "/video" ? "iconbtn_video_sel" : "iconbtn_video"}
          className={styles.icon}
        />
        <span>视频</span>
      </Link>
      <Link
        to={"/mine"}
        className={classNames({ [styles.active]: pathname === "/mine" })}
      >
        <GeekIcon
          type={pathname === "/mine" ? "iconbtn_mine_sel" : "iconbtn_mine"}
          className={styles.icon}
        />
        <span>我的</span>
      </Link>
    </div>
  );
}

export default Tabbar;
