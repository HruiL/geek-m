import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import styles from "@styles/layout.module.less";
import Tabbar from "@shared/tabbar";
export interface OutletScrollProps {
  getScrollDistance: () => number;
  setContainerScroll: (target: number) => void;
}
function MainLayout() {
  // 记录页面的滚动距离
  const scrollDistance = useRef(0);
  // 记录滚动元素
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  // 获取滚动距离
  const getScrollDistance = () => scrollDistance.current;
  // 设置元素的滚动距离
  const setContainerScroll = (target: number) => {
    scrollContainer.current!.scrollTop = target;
  };
  return (
    <div className={styles.layout}>
      {/*  页面主体内容区域*/}
      <div
        className={styles.content}
        ref={scrollContainer}
        onScroll={(event) =>
          (scrollDistance.current = event.currentTarget.scrollTop)
        }
      >
        {/*  路由占位符，主体内容由路由加载出来*/}
        <Outlet context={{ getScrollDistance, setContainerScroll }} />
      </div>
      {/*  底部内容区域*/}
      <div className={styles.bottom}>
        <Tabbar />
      </div>
    </div>
  );
}

export default MainLayout;
