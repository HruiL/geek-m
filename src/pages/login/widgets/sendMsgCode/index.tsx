import React, { useEffect, useState } from "react";
import { useLazySendMsgCodeQuery } from "@service/auth";
import {
  UseFormGetFieldState,
  UseFormGetValues,
} from "react-hook-form/dist/types/form";
import { LoginFormState } from "@pages/login";
import classNames from "classnames";
import styles from "@styles/login.module.less";
import toast from "react-hot-toast";
interface Props {
  // 获取字段校验的状态
  getFieldState: UseFormGetFieldState<LoginFormState>;
  // 获取字段值
  getValues: UseFormGetValues<LoginFormState>;
}

function SendMsgCode({ getFieldState, getValues }: Props) {
  // 是否正在到计时
  const [isActive, setIsActive] = useState(false);
  // 倒计时的秒数
  const [count, setCount] = useState(60);
  // 发送验证码的请求
  const [sendMsg, { isError }] = useLazySendMsgCodeQuery();
  // 发送短信验证码
  const sendMsgCode = async () => {
    // 1. 判断用户是否输入了正确的手机号
    // 校验方式一：error 若手机号出现错误，则error的值为对象，若没错，则error的值为undefined,如果手机号输入错误(也就是有错误对象)，则不再继续向下执行
    // const { error } = getFieldState("mobile");
    // if (typeof error !== "undefined") return;
    // 校验方式二：invalid 校验通过invalid为false，校验未通过invalid为true
    const { invalid } = getFieldState("mobile");
    if (invalid) return;
    // 2. 判断是否正在倒计时,如果正在倒计时，则不再继续向下执行
    if (isActive) return;
    // 3. 发送验证码
    const mobile = getValues("mobile");
    await sendMsg(mobile).unwrap();
    // 开始倒计时
    setIsActive(true);
  };
  // 倒计时
  useEffect(() => {
    // 如果正在倒计时，则不再开始定时器
    if (!isActive) return;
    // 开始定时器
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    // 在每次开启定时器之前，现在清理函数中清理上一次的定时器
    return () => clearInterval(timer);
  }, [isActive]);
  // 监听倒计时，重置倒计时时间
  useEffect(() => {
    // 如果倒计时还没有结束，则不要做重置倒计时的操作
    if (count !== 0) return;
    // 倒计时结束，将倒计时的状态改为false
    setIsActive(false);
    // 倒计时结束，将倒计时的描述改为初始值60
    setCount(60);
  }, [count]);
  // 监听验证码是否发送失败，给用户提示消息，一个手机号限一分钟
  useEffect(() => {
    if (!isError) return;
    toast.error("验证码发送失败");
  }, [isError]);
  return (
    <button
      type="button"
      onClick={sendMsgCode}
      className={classNames({ [styles.active]: isActive })}
    >
      {isActive ? `${count}秒后获取` : "发送验证码"}
    </button>
  );
}

export default SendMsgCode;
