import React, { useEffect, useRef } from "react";
import styles from "@styles/channel.module.less";
import classNames from "classnames";
import useChannelScroll from "@pages/home/common/useChannelScroll";
import useGuestChannel from "@pages/home/common/useGuestChannel";
import { useNavigate, useParams } from "react-router-dom";

function GuestChannel() {
  const { scrollContainer, scrollHandler } = useChannelScroll();
  // 获取访客频道
  const channels = useGuestChannel();
  // 获取路径参数
  const { cid } = useParams();
  // 页面跳转
  const navigate = useNavigate();
  // 绑定频道项
  const divRefs = useRef<Record<number, HTMLDivElement>>({});
  // 监听路径参数的变化，实现频道的滚动
  useEffect(() => {
    if (typeof cid === "undefined") return;
    const currentDivRef = divRefs.current[Number(cid)];
    if (typeof currentDivRef === "undefined") return;
    scrollHandler(currentDivRef);
  }, [cid, scrollHandler]);
  return (
    <div className={styles.list} ref={scrollContainer}>
      {channels.map((channel) => (
        <div
          key={channel.id}
          className={classNames(styles.item, {
            [styles.active]: Number(cid!) === channel.id,
          })}
          ref={(ele) => (divRefs.current[channel.id] = ele!)}
          onClick={(event) => {
            scrollHandler(event.currentTarget);
            navigate(`/${channel.id}`);
          }}
        >
          {channel.name}
        </div>
      ))}
    </div>
  );
}

export default GuestChannel;
