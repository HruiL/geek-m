import React from "react";
import styles from "@styles/updateUserChannel.module.less";
import {
  useRequestAllChannelQuery,
  useRequestUserChannelsQuery,
} from "@service/channel";
import Item from "@pages/home/widgets/updateUserChannel/item";

function Unselect() {
  // 获取所有的频道
  const { data: allChannel, isSuccess: allChannelSuccess } =
    useRequestAllChannelQuery(undefined);
  // 获取用户已经选择的频道
  const { data: selectChannel, isSuccess: selectChannelSuccess } =
    useRequestUserChannelsQuery(undefined);
  // 频道列表请求成功的时候在结算可选频道列表
  if (!allChannelSuccess || !selectChannelSuccess) return null;
  // 计算可选频道列表
  const selectable = allChannel.data.channels.filter(
    (ac) =>
      typeof selectChannel.data.channels.find((uc) => uc.id === ac.id) ===
      "undefined"
  );

  return (
    <>
      <div className={styles.title}>
        <h3>可选频道</h3>
      </div>
      <div className={styles.list}>
        {selectable.map((item) => (
          <Item
            item={item}
            key={item.id}
            seq={selectChannel.data.channels.length}
          />
        ))}
      </div>
    </>
  );
}

export default Unselect;
