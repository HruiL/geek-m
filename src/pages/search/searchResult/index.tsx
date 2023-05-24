import React, { useEffect, useRef, useState } from "react";
import css from "@styles/searchResult.module.less";
import Header from "@shared/header";
import Back from "@shared/back";
import styles from "@styles/news.module.less";
import { useParams } from "react-router-dom";
import { useRequestSearchResultMutation } from "@service/search";
import Infinite from "@shared/infinite";
import { useTypedDispatch, useTypedSelector } from "@store/index";
import {
  clearSearchResult,
  saveSearchResult,
  searchResultSelector,
} from "@slice/search";
import NewItem from "@pages/home/widgets/newItem";
function SearchResult() {
  // 获取路径参数
  const { key } = useParams();
  // 获取请求搜索结果的方法
  const [search] = useRequestSearchResultMutation();
  // 是否还有更多数据可以加载
  const [hasMore, setHasMore] = useState(true);
  // 记录页面的变化
  const [page, setPage] = useState(1);
  // 记录服务端返回的数据总数
  const total_s = useRef();
  // 获取dispatch方法
  const dispatch = useTypedDispatch();
  // 获取本地数据总数
  const total_l = useTypedSelector(searchResultSelector.selectTotal);
  // 获取本地数据
  const result = useTypedSelector(searchResultSelector.selectAll);
  // 页码挂载请求第一页数据
  useEffect(() => {
    search({ page: 1, per_page: 10, q: key! })
      .unwrap()
      .then((res) => {
        dispatch(saveSearchResult(res.data.results));
        total_s.current = res.data.total_count;
      });
    // 页码卸载，清除本地的数据，防止下一次进入页面之后，将新数据和老数据进行了累加
    return () => {
      dispatch(clearSearchResult());
    };
  }, [dispatch, key, search]);
  // 往下滑动请求下一页数据
  const loadMore = () => {
    return search({ page, per_page: 10, q: key! })
      .unwrap()
      .then((res) => {
        // 保存数据到本地
        dispatch(saveSearchResult(res.data.results));
        // 判断是否还有更多数据可以加载，本地的数据和服务端返回的数据不等时，表示还可以继续加载
        setHasMore(total_l !== total_s.current);
        // 页码递增
        setPage((pre) => pre + 1);
      });
  };
  return (
    <div className={css.result}>
      <Header title={"搜索结果"} left={<Back />} />
      <ul className={styles.news}>
        {result.map((news) => (
          <NewItem news={news} key={news.art_id} />
        ))}
      </ul>
      <Infinite hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
}

export default SearchResult;
