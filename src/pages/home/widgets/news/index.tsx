import React, { useEffect } from "react";
import styles from "@styles/news.module.less";
import NewItem from "@pages/home/widgets/newItem";
import { useOutletContext, useParams } from "react-router-dom";
import { useRequestNewsMutation } from "@service/news";
import { useTypedDispatch, useTypedSelector } from "@store/index";
import { channelNewsSelector, saveNews, saveScrollDistance } from "@slice/news";
import Infinite from "@shared/infinite";
import { OutletScrollProps } from "@shared/mainLayout";

function News() {
  // 1. 获取频道id
  const { cid } = useParams();
  // 2. 获取请求新闻列表的方法
  const [requestNews] = useRequestNewsMutation();
  // 3. 从本地获取频道对应的新闻列表 由于一定得有频道id才会进入到首页，所以这里的频道id是一定存在的
  const channelNews = useTypedSelector(channelNewsSelector(cid!));
  // 获取dispatch方法
  const dispatch = useTypedDispatch();
  // 获取滚动元素的位置和设置滚动元素的滚动距离
  const { getScrollDistance, setContainerScroll } =
    useOutletContext<OutletScrollProps>();
  // 4. 加载频道新闻列表
  // 4.1 判断本地是否存在新闻列表，如果不存在（也就是第一次请求）在请求新闻列表的时候传递当前的时间戳，如果存在，传递上一次请求时服务端返回的时间戳
  const loadMore = () => {
    // 4.2 子组件要求要接受一个返回promise的方法，requestNews就是一个promise对象
    return requestNews({
      channel_id: cid!,
      timestamp:
        typeof channelNews === "undefined"
          ? Date.now() + ""
          : channelNews.pre_timestamp,
    })
      .unwrap()
      .then((response) => {
        const { pre_timestamp, results } = response.data;
        // 5. 请求完成 保存新闻列表到本地
        dispatch(saveNews({ cid: cid as string, pre_timestamp, results }));
      });
  };
  // 记录页面滚动并在重新进入页面之后设置页面的滚动
  useEffect(() => {
    // 进入页面之后，设置页面滚动
    setContainerScroll(channelNews?.distance || 0);
    return () => {
      // 离开页面之后，保存页面滚动
      dispatch(
        saveScrollDistance({
          cid: Number(cid!),
          distance: getScrollDistance(),
        })
      );
    };
  }, [
    cid,
    dispatch,
    setContainerScroll,
    channelNews?.distance,
    getScrollDistance,
  ]);
  return (
    <>
      <ul className={styles.news}>
        {channelNews?.results.map((news) => (
          <NewItem key={news.art_id} news={news} />
        ))}
      </ul>
      {/*1. 当有新闻列表的情况下，在渲染无限列表加载组件（如果没有新闻列表就渲染了无限列表加载组件，会出现不断发请求的情况，因为没有渲染新闻列表去占位置，无限列表的元素一直在可视区域内，所以会不断的发送请求
       2. 当服务端返回的pre_timestamp为null时，说明已经没有更多数据可以加载了*/}
      <Infinite
        hasMore={channelNews?.pre_timestamp !== null}
        loadMore={loadMore}
      />
    </>
  );
}

export default News;
