import React, { useEffect, useRef } from "react";
import styles from "@styles/channel.module.less";
import classNames from "classnames";
import useChannelScroll from "@pages/home/common/useChannelScroll";
import { useRequestUserChannelsQuery } from "@service/channel";
import Loading from "@shared/loading";
import { useNavigate, useParams } from "react-router-dom";

function UserChannel() {
  const { scrollContainer, scrollHandler } = useChannelScroll();
  const { data, isLoading } = useRequestUserChannelsQuery(undefined);
  const { cid } = useParams();
  const navigate = useNavigate();
  const divRefs = useRef<Record<number, HTMLDivElement>>({});
  useEffect(() => {
    // 监听数据是都获取成功，dom是否已经追加到divRefs上了
    if (!data) return;
    if (divRefs.current !== null && typeof cid !== "undefined") {
      scrollHandler(divRefs.current[Number(cid)]);
    }
  }, [cid, scrollHandler, data]);
  if (isLoading) return <Loading />;
  if (!data) return <div>暂无数据</div>;
  // 用户频道列表
  const channels = data.data.channels;
  return (
    <div className={styles.list} ref={scrollContainer}>
      {channels.map((channel) => (
        <div
          ref={(ele) => (divRefs.current![channel.id] = ele!)}
          key={channel.id}
          className={classNames(styles.item, {
            [styles.active]: Number(cid!) === channel.id,
          })}
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

export default UserChannel;
