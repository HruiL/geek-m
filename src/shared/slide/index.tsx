import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styles from "@styles/slide.module.less";
import classNames from "classnames";
import ReactDOM from "react-dom";
interface Props {
  // 弹层内部要渲染的内容
  children: React.ReactNode;
  // 弹层滑动方向
  direction: "toTop" | "toLeft" | "toRight";
}
export interface SlideRef {
  // 渲染弹层
  open: () => void;
  // 销毁弹层
  close: () => void;
}
/**
 * 1. 若要执行弹出动画, 为外层元素添加 styles.active 类名
 * 2. 如要调整弹层方向, 为内层元素添加 styles.toTop 或 styles.toLeft 或 styles.toRight 类名
 * 3. 将弹层渲染到 body 中, 而不是在哪调用就在哪渲染*/
const Slide = forwardRef<SlideRef, Props>(
  ({ children, direction }: Props, ref) => {
    // 控制弹框渲染和销毁的状态
    const [isRender, setIsRender] = useState(false);
    // 控制为元素添加动画类名
    const [isActive, setIsActive] = useState(false);
    // 如果要显示弹框，给元素添加动画类名
    useEffect(() => {
      if (isRender) setIsActive(true);
    }, [isRender]);
    // 渲染弹层
    const open = useCallback(() => {
      setIsRender(true);
    }, [setIsRender]);
    // 销毁弹层
    const close = useCallback(() => {
      // 删除active动画类名
      setIsActive(false);
      setTimeout(() => {
        // 关闭弹框
        setIsRender(false);
      }, 400);
    }, [setIsActive]);
    // 往钩子上挂载方法，供父组件使用
    useImperativeHandle(ref, () => ({ open, close }), [open, close]);
    return isRender
      ? ReactDOM.createPortal(
          <div
            className={classNames(styles.layer, {
              [styles.active]: isActive,
            })}
            onClick={close}
          >
            <div
              className={classNames(styles.content, {
                [styles.toTop]: direction === "toTop",
                [styles.toLeft]: direction === "toLeft",
                [styles.toRight]: direction === "toRight",
              })}
              onClick={(event) => event.stopPropagation()}
            >
              {children}
            </div>
          </div>,
          document.body
        )
      : null;
  }
);
export default Slide;
