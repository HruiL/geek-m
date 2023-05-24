import React from "react";
import GeekIcon from "@shared/geekIcon";
import { useNavigate } from "react-router-dom";
interface Props {
  // 点击返回按钮要执行的事情
  onClick?: () => void;
}
function Back({ onClick }: Props) {
  const navigate = useNavigate();
  return (
    <GeekIcon
      type="iconfanhui"
      style={{ width: "4.5333vw", height: "4.5333vw" }}
      onClick={() => {
        if (typeof onClick === "function") onClick();
        navigate(-1);
      }}
    />
  );
}

export default Back;
