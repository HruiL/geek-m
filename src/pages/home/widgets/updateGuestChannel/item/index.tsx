import React from "react";
import { addGuestChannel } from "@slice/guestChannel";
import { useTypedDispatch } from "@store/index";
interface Props {
  item: Channel;
}
function Item({ item }: Props) {
  // 获取dispatch方法
  const dispatch = useTypedDispatch();
  return (
    <span onClick={() => dispatch(addGuestChannel(item))}>+ {item.name}</span>
  );
}

export default Item;
