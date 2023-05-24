import React from "react";
import GeekIcon from "@shared/geekIcon";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "@store/index";
import { deleteOneSearchHistory } from "@slice/searchHistory";
interface Props {
  searchKey: SearchKey;
}
function HistorySearchItem({ searchKey }: Props) {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  return (
    <li onClick={() => navigate(`/result/${searchKey.name}`)}>
      {searchKey.name}
      <GeekIcon
        type={"iconbtn_essay_close"}
        onClick={(event) => {
          event.stopPropagation();
          dispatch(deleteOneSearchHistory({ id: searchKey.id }));
        }}
      />
    </li>
  );
}

export default HistorySearchItem;
