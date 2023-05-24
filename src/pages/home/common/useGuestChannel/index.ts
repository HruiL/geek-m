import { useLazyRequestGuestChannelsQuery } from "@service/channel";
import { useTypedSelector } from "@store/index";
import { guestChannelSelector } from "@slice/guestChannel";
import { useEffect } from "react";

export default function useGuestChannel() {
  // 先从本地获取访客频道 如果本地有，就用本地的
  const channels = useTypedSelector(guestChannelSelector.selectAll);
  // 本地访客频道的数据总数
  const total = useTypedSelector(guestChannelSelector.selectTotal);
  // 向服务端请求访客频道列表的方法
  const [requestGuestChannel] = useLazyRequestGuestChannelsQuery();
  // 如果本地没有，向服务端发送请求，获取数据
  useEffect(() => {
    if (total) return;
    requestGuestChannel(undefined);
  }, [total, requestGuestChannel]);
  return channels;
}
