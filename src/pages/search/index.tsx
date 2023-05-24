import React, { useEffect, useMemo, useState } from "react";
import styles from "@styles/search.module.less";
import Back from "@shared/back";
import GeekIcon from "@shared/geekIcon";
import Suggest from "@pages/search/suggest";
import HistorySearch from "@pages/search/historySearch";
import { searchService, useLazyRequestSuggestQuery } from "@service/search";
import { useDebounce } from "use-debounce";
import { useTypedDispatch } from "@store/index";
import { addOneSearchHistory } from "@slice/searchHistory";
import { useNavigate } from "react-router-dom";
function Search() {
  // 搜索输入框的受控
  const [key, setKey] = useState("");
  // 请求搜索关键词的方法
  const [requestSuggest, { data }] = useLazyRequestSuggestQuery();
  // 使用插件实现防抖，获取到防抖之后的值
  const [debounceValue] = useDebounce(key, 1000);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  // 监听防抖之后的值，如果不发生变化了，就可以去发送请求获取联想关键词了
  useEffect(() => {
    // 由于页面初次挂载时就会发送请求，避免在输入框还没有输入的情况下就发送了请求
    if (debounceValue.trim().length) {
      // 输入框有内容，发送请求
      requestSuggest(debounceValue);
    } else {
      // 输入框没有内容时，清空已有的联想列表
      dispatch(searchService.util.resetApiState());
    }
  }, [key, debounceValue, requestSuggest, data, dispatch]);
  // 判断联想关键词是否存在
  const hasSuggestion = useMemo(() => {
    if (typeof data === "undefined") return false;
    // 如果没有搜索结果，options:[null]，要排除掉为null的情况
    return data.data.options.filter((item) => item).length > 0;
  }, [data]);
  // 用于匹配搜索关键词的正则对象 将该方法做缓存，只有防抖之后的值发生变化之后才重新生成新的方法
  const reg = useMemo(() => {
    return new RegExp(debounceValue, "gi");
  }, [debounceValue]);
  return (
    <div className={styles.search_page}>
      <div className={styles.header}>
        <Back />
        <div className={styles.input}>
          <GeekIcon type={"iconbtn_search"} />
          <input
            type="search"
            placeholder={"请输入关键字搜索"}
            value={key}
            onChange={(event) => setKey(event.currentTarget.value)}
          />
        </div>
        <span
          className={styles.search_btn}
          onClick={() => {
            dispatch(addOneSearchHistory({ name: key }));
            navigate(`/result/${key}`);
          }}
        >
          搜索
        </span>
      </div>
      {/*有联想关键词时渲染联想关键词*/}
      {hasSuggestion && (
        <Suggest
          suggest={data!.data.options
            .filter((item) => item)
            .map((item) => ({
              origin: item,
              name: item.replace(reg, (str) => `<span>${str}</span>`),
            }))}
        />
      )}
      {/*没有联想关键词时渲染搜索历史记录*/}
      {!hasSuggestion && <HistorySearch />}
    </div>
  );
}

export default Search;
