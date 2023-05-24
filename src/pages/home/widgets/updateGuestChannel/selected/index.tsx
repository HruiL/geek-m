import React, { useState } from "react";
import styles from "@styles/updateUserChannel.module.less";
import useGuestChannel from "@pages/home/common/useGuestChannel";
import EditButton from "@pages/home/common/EditButton";
import { useTypedDispatch, useTypedSelector } from "@store/index";
import { deleteGuestChannel, guestChannelSelector } from "@slice/guestChannel";
import GeekIcon from "@shared/geekIcon";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import { SlideRef } from "@shared/slide";
interface Props {
  slideRef: React.RefObject<SlideRef>;
}
function Selected({ slideRef }: Props) {
  // 获取访客已选频道
  const channels = useGuestChannel();
  // 获取dispatch
  const dispatch = useTypedDispatch();
  // 获取访客频道的所有数量
  const guestChannelsTotal = useTypedSelector(guestChannelSelector.selectTotal);
  // 按钮的状态 编辑/完成
  const [isEditing, setIsEditing] = useState(false);
  // 页面跳转
  const navigate = useNavigate();
  // 获取页面路径参数
  const { cid } = useParams();
  return (
    <>
      <div className={styles.title}>
        <h3>我的频道</h3>
        <h4>点击进入频道</h4>
        <EditButton
          value={isEditing}
          onChange={setIsEditing}
          render={guestChannelsTotal > 4}
        />
      </div>
      <div className={styles.list}>
        {channels.map((channel) => (
          <span
            key={channel.id}
            className={classNames({
              [styles.active]: Number(cid!) === channel.id,
            })}
            onClick={() => {
              navigate(`/${channel.id}`);
              slideRef.current?.close();
            }}
          >
            {channel.name}
            {isEditing && channel.id !== 0 && (
              <GeekIcon
                type={"iconbtn_tag_close"}
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(deleteGuestChannel(channel.id));
                  if (channel.id === Number(cid!)) navigate("/0");
                }}
              />
            )}
          </span>
        ))}
      </div>
    </>
  );
}

export default Selected;
