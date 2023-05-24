import React from "react";
interface Props {
  // 图标类型
  type: string;
  // 给图标添加的类名
  style?: React.CSSProperties;
  // 给图标添加的行内样式
  className?: string;
  // 图标的点击事件
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
}
function GeekIcon({ type, style, className, onClick }: Props) {
  return (
    <svg style={style} onClick={onClick} className={className}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
}

export default GeekIcon;
