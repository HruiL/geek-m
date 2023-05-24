import React from "react";
import GeekIcon from "@shared/geekIcon";
import { useNavigate } from "react-router-dom";
interface Props {
  // 带高亮的搜索词
  data: string;
  // 输入框原始输入的内容
  origin: string;
}
function SuggestItem({ data, origin }: Props) {
  const navigate = useNavigate();
  return (
    <li onClick={() => navigate(`/result/${origin}`)}>
      <GeekIcon type={"iconbtn_search"} />
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    </li>
  );
}

export default SuggestItem;
