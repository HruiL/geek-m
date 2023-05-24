import React, { useEffect } from "react";
import { useAddUserChannelMutation } from "@service/channel";
import toast from "react-hot-toast";
interface Props {
  // 可选频道
  item: Channel;
  // 用户频道的总长度（新添加的频道追加到后面）
  seq: number;
}
function Item({ item, seq }: Props) {
  // 添加请求
  const [addChannel, { isSuccess }] = useAddUserChannelMutation();
  useEffect(() => {
    if (isSuccess) toast.success("用户频道添加成功");
  }, [isSuccess]);
  return (
    <span
      key={item.id}
      onClick={() => addChannel({ channels: [{ id: item.id, seq }] })}
    >
      + {item.name}
    </span>
  );
}

export default Item;
