import { useCallback, useRef } from "react";

export default function useChannelScroll() {
  // 获取滚动元素
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  // 滚动事件，在点击元素时使元素滚动到中间位置
  const scrollHandler = useCallback(
    (target: HTMLDivElement) => {
      // 获取视口宽度
      const innerWidth = window.innerWidth;
      // 点击元素的中心点距离左侧的距离(元素距离左侧的距离+元素宽度的一半)-视口宽度的一半((视口总宽度-右侧按钮的宽度) / 2,右侧按钮是自适应的，右侧按钮的宽度是23.73vw，占视口总宽度的0.2373)，就是元素滚动的距离
      scrollContainer.current!.scrollTo({
        left:
          target.offsetLeft +
          target.offsetWidth / 2 -
          (innerWidth - innerWidth * 0.2373) / 2,
        behavior: "smooth",
      });
    },
    [scrollContainer]
  );
  return { scrollContainer, scrollHandler };
}
