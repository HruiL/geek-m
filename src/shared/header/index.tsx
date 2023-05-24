import React from "react";
import styles from "@styles/header.module.less";
interface Props {
  // 标题
  title?: string;
  // 左侧结构
  left: React.ReactElement;
  // 右侧结构
  right?: React.ReactElement;
  // 给头部添加的类名
  className?: string;
}
function Header({ title, left, right, className }: Props) {
  return (
    <div className={`${styles.container} ${className}`}>
      {left}
      <div className={styles.title}>{title}</div>
      {right}
    </div>
  );
}

export default Header;
