import React, { useRef } from "react";
import styles from "@styles/personal.module.less";
import { resetCredential } from "@slice/credential";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "@store/index";
import Confirm, { ConfirmRef } from "@shared/confirm";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const confirmRef = useRef<ConfirmRef | null>(null);
  // 退出登录
  const logout = () => {
    confirmRef.current?.open();
  };
  return (
    <>
      <button className={styles.logout} onClick={logout}>
        退出登录
      </button>
      <Confirm
        ref={confirmRef}
        onConfirm={() => {
          // 清空本地存储的用户登录凭据
          dispatch(resetCredential());
          // 跳转到首页
          navigate("/");
        }}
      />
    </>
  );
}

export default Logout;
