import React from "react";
import styles from "@styles/search.module.less";
import GeekIcon from "@shared/geekIcon";
import {
  deleteAllSearchHistory,
  searchHistorySelector,
} from "@slice/searchHistory";
import { useTypedDispatch, useTypedSelector } from "@store/index";
import HistorySearchItem from "@pages/search/historySearch/widgets/historySearchItem";

function HistorySearch() {
  const searchHistory = useTypedSelector(searchHistorySelector.selectAll);
  const dispatch = useTypedDispatch();
  return (
    <ul className={styles.history}>
      <li>
        历史记录
        <GeekIcon
          type={"iconbtn_del"}
          onClick={() => dispatch(deleteAllSearchHistory())}
        />
      </li>
      {searchHistory.map((item) => (
        <HistorySearchItem key={item.id} searchKey={item} />
      ))}
    </ul>
  );
}

export default HistorySearch;
