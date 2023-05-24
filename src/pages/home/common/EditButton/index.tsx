import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "@styles/updateUserChannel.module.less";
interface Props {
  // 控制按钮显示的是编辑还是完成
  value: boolean;
  // 组件内部修改状态，并传递到外部，实现双向数据绑定
  onChange: (status: boolean) => void;
  // 控制是否渲染按钮（已选频道不能小于4）
  render: boolean;
}
function EditButton({ value, onChange, render }: Props) {
  // 控制组件内部按钮是否处于可编辑状态
  const [isEditing, setIsEditing] = useState(value);
  // 监听外部状态，修改内部状态
  useEffect(() => {
    setIsEditing(value);
  }, [value]);
  // 监听内部状态，修改外部状态
  useEffect(() => {
    onChange(isEditing);
  }, [isEditing, onChange]);
  // 监听按钮的渲染状态，如果为false，则取消编辑状态
  useEffect(() => {
    if (!render) setIsEditing(false);
  }, [render]);
  return render ? (
    <button
      className={classNames({ [styles.active]: isEditing })}
      onClick={() => setIsEditing(!isEditing)}
    >
      {isEditing ? "完成" : "编辑"}
    </button>
  ) : null;
}

export default EditButton;
