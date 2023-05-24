import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "@styles/infinite.module.less";
interface Props {
  // 是否还有更多元素可以被加载
  hasMore: boolean;
  // 用于请求更多数据的方法，返回promise的原因是希望能够在本组件中获取到加载的状态
  loadMore: () => Promise<any>;
}
function Infinite({ hasMore, loadMore }: Props) {
  const { ref, inView } = useInView();
  // 请求锁
  const [loading, setLoading] = useState(false);
  // 监听元素是否进入了可视区
  useEffect(() => {
    // 如果元素进入了可视区域，并且还有数据可以加载，并且当前没有正在加载
    if (inView && hasMore && !loading) {
      // 修改加载状态为正在加载
      setLoading(true);
      // 发请求，请求完成，并且在浏览器空闲时(数据请求完成，但是页面可能还没有渲染完成，要等到组件渲染完成之后，再发请求，如果不等待渲染完就去发请求，就会出现同一个请求可能会被发送多次)，修改加载状态为false
      loadMore().finally(() => requestIdleCallback(() => setLoading(false)));
    }
  }, [hasMore, inView, loadMore, loading]);
  return (
    <div ref={ref} className={styles.container}>
      {loading && "正在加载中..."}
      {!hasMore && "没有更多数据可以加载"}
    </div>
  );
}

export default Infinite;
