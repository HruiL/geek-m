import ReactDOM from "react-dom";
import styles from "@styles/confirm.module.less";
import classNames from "classnames";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
export interface ConfirmRef {
  // 渲染弹框
  open: () => void;
  // 关闭弹框
  close: () => void;
}
interface Props {
  // 弹框提示内容
  content?: string;
  // 弹框提示标题
  title?: string;
  // 点击确认要做的事情
  onConfirm: () => void;
}
export default forwardRef<ConfirmRef, Props>(
  ({ title, content, onConfirm }, ref) => {
    // 控制弹框是否渲染
    const [isRender, setIsRender] = useState(false);
    // 控制弹框是否执行动画
    const [isActive, setIsActive] = useState(false);
    // 渲染弹框
    const open = useCallback(() => {
      setIsRender(true);
    }, []);
    // 监听弹框是否已经渲染，如果是，执行动画
    useEffect(() => {
      if (isRender) setIsActive(true);
    }, [isRender]);
    // 销毁弹框
    const close = useCallback(() => {
      // 1. 先执行离场动画
      setIsActive(false);
      // 2. 待动画执行完后再销毁弹框
      setTimeout(() => {
        setIsRender(false);
      }, 400);
    }, []);
    // 向外暴露渲染和销毁弹框的方法，供父组件使用
    useImperativeHandle(ref, () => ({ open, close }), [open, close]);
    return ReactDOM.createPortal(
      isRender ? (
        <div
          className={classNames(styles.layer, { [styles.active]: isActive })}
        >
          <div className={styles.container}>
            <div className={styles.title}>{title || "温馨提示"}</div>
            <div className={styles.content}>{content || "您确定要退出吗?"}</div>
            <div className={styles.buttons}>
              <button className={styles.cancel} onClick={close}>
                取消
              </button>
              <button className={styles.sure} onClick={onConfirm}>
                确定
              </button>
            </div>
          </div>
        </div>
      ) : null,
      document.body
    );
  }
);
