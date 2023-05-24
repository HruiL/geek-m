import React, { useEffect, useState } from "react";
import styles from "@styles/updateUserChannel.module.less";
import classNames from "classnames";
import GeekIcon from "@shared/geekIcon";
import {
  useDeleteUserChannelMutation,
  useRequestUserChannelsQuery,
} from "@service/channel";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { SlideRef } from "@shared/slide";
import EditButton from "@pages/home/common/EditButton";
interface Props {
  slideRef: React.RefObject<SlideRef | null>;
}
function Selected({ slideRef }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  // 路由路径参数 频道id
  const { cid } = useParams();
  // 页面跳转
  const navigate = useNavigate();
  const { channels } = useRequestUserChannelsQuery(undefined, {
    selectFromResult: (response) => ({
      ...response,
      channels: response.data?.data.channels || [],
    }),
  });
  const [deleteUserChannel, { isSuccess }] = useDeleteUserChannelMutation();
  // 最低剩4个频道
  useEffect(() => {
    if (channels.length === 4) setIsEditing(false);
  }, [channels]);
  // 监听是否删除成功
  useEffect(() => {
    if (isSuccess) toast.success("删除成功");
  }, [isSuccess]);
  return (
    <>
      <div className={styles.title}>
        <h3>我的频道</h3>
        <h4>点击进入频道</h4>
        <EditButton
          value={isEditing}
          onChange={setIsEditing}
          render={channels.length > 4}
        />
      </div>
      <div className={styles.list}>
        {channels?.map((item) => (
          <span
            key={item.id}
            className={classNames({
              [styles.active]: item.id === Number(cid!),
            })}
            onClick={(event) => {
              navigate(`/${item.id}`);
              slideRef.current?.close();
            }}
          >
            {isEditing && Number(item.id) !== 0 && (
              <GeekIcon
                type={"iconbtn_tag_close"}
                onClick={(event) => {
                  event.stopPropagation();
                  deleteUserChannel(String(item.id))
                    .unwrap()
                    .then(() => {
                      if (item.id === Number(cid!)) navigate("/0");
                    });
                }}
              />
            )}
            {item.name}
          </span>
        ))}
      </div>
    </>
  );
}

export default Selected;
