import React from "react";
import styles from "@styles/updateUserChannel.module.less";
import { useRequestAllChannelQuery } from "@service/channel";
import useGuestChannel from "@pages/home/common/useGuestChannel";
import Item from "@pages/home/widgets/updateGuestChannel/item";

function Unselect() {
  // 获取所有频道列表
  const { data: allChannels, isSuccess } = useRequestAllChannelQuery(undefined);
  // 获取访客已选频道列表
  const selectedChannel = useGuestChannel();

  // 如果所有频道列表未获取成功
  if (!isSuccess) return null;
  //  计算可选频道列表
  const selectable = allChannels.data.channels.filter(
    (ac) => typeof selectedChannel.find((gc) => gc.id === ac.id) === "undefined"
  );

  return (
    <>
      <div className={styles.title}>
        <h3>可选频道</h3>
      </div>
      <div className={styles.list}>
        {selectable.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}

export default Unselect;
