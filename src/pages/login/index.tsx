import React from "react";
import styles from "@styles/login.module.less";
import Header from "@shared/header";
import Back from "@shared/back";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@service/auth";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SendMsgCode from "@pages/login/widgets/sendMsgCode";
import { useLazyGetUserProfileQuery } from "@service/user";

export interface LoginFormState {
  mobile: string;
  code: string;
}
const schema = z.object({
  mobile: z
    .string({
      invalid_type_error: "手机号参数类型错误",
      required_error: "请检查字段名称是否正确",
    })
    .min(1, "请输入手机号")
    .regex(/^1[3-9]\d{9}/, "手机号格式错误"),
  code: z
    .string({
      invalid_type_error: "验证码参数格式错误",
      required_error: "请检查字段名称是否正确",
    })
    .length(6, "验证码格式错误"),
});
function Login() {
  // 创建表单对象
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getFieldState,
    getValues,
  } = useForm<LoginFormState>({
    // 输入的过程实时触发表单校验
    mode: "onChange",
    // 表单校验器
    resolver: zodResolver(schema),
    // 表单默认值
    defaultValues: { mobile: "13911111111", code: "246810" },
  });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  // // 获取用户个人信息
  const [getUserProfile] = useLazyGetUserProfileQuery();
  // 获取路由信息
  const location = useLocation();
  // 表单提交
  const submitHandler: SubmitHandler<LoginFormState> = (formState) => {
    login(formState)
      .unwrap()
      .then(() => {
        navigate(location.state?.from || "/");
        toast.success("登录成功");
        getUserProfile(undefined);
      })
      .catch((error) => {
        if (typeof error !== "undefined" && "status" in error) {
          const response = error.data as GeekResponse<null>;
          toast.error(response.message);
        }
      });
  };
  return (
    <div className={styles.login_page}>
      <Header left={<Back />} />
      <h2>短信登录</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={styles.form_item}>
          <input
            type={"text"}
            placeholder="请输入手机号"
            {...register("mobile")}
          />
          {errors.mobile && (
            <p className={styles.error_message}>{errors.mobile.message}</p>
          )}
        </div>
        <div className={styles.form_item}>
          <input
            type={"text"}
            placeholder="请输入验证码"
            {...register("code")}
          />
          {/* 如果验证码正在发送，类名是active */}
          <SendMsgCode getFieldState={getFieldState} getValues={getValues} />
          {errors.code && (
            <p className={styles.error_message}>{errors.code.message}</p>
          )}
        </div>
        <button
          disabled={isLoading || !isValid}
          className={styles.login_button}
        >
          {isLoading ? "正在登录..." : "登录"}
        </button>
      </form>
    </div>
  );
}

export default Login;
