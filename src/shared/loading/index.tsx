import ReactDOM from "react-dom";
import styles from "@styles/loading.module.less";
function Loading() {
  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>,
    document.body
  );
}

export default Loading;
