import React, { ChangeEvent, useEffect, useRef } from "react";
import styles from "@styles/personal.module.less";
import { SlideRef } from "@shared/slide";
import { useUploadAvatarMutation } from "@service/user";
import toast from "react-hot-toast";
interface Props {
  slideRef: React.RefObject<SlideRef | null>;
}
function UpdateAvatar({ slideRef }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploadAvatar, { isError, isSuccess }] = useUploadAvatarMutation();
  // 拍照还是选择照片
  const trigger = (mark: "take" | "select") => {
    if (mark === "take") {
      fileRef.current?.setAttribute("capture", "user");
    } else {
      fileRef.current?.removeAttribute("capture");
    }
    // 文件上传的表单控件被隐藏了，需要手动触发文件上传控件的点击事件
    fileRef.current?.click();
  };
  // 上传头像
  const uploadAvatarHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // 获取用户选择的文件列表
    const files = event.target.files;
    // 如果未选择文件
    if (!files) return null;
    // 获取选择的图片
    const file = files[0];
    // 创建表单对象
    const formData = new FormData();
    // 往表单对象中追加photo属性，值为用户选择的图片
    formData.append("photo", file);
    // 上传头像
    uploadAvatar(formData);
  };
  // 监听是否上传成功
  useEffect(() => {
    if (isSuccess) {
      toast.success("头像上传成功");
      slideRef.current?.close();
    }
  }, [isSuccess, slideRef]);
  useEffect(() => {
    if (isError) toast.error("头像上传失败");
  }, [isError]);
  return (
    <>
      <ul className={styles.list}>
        <li onClick={() => trigger("take")}>拍照</li>
        <li onClick={() => trigger("select")}>选择照片</li>
        <li onClick={() => slideRef.current?.close()}> 取消</li>
      </ul>
      <input
        type={"file"}
        ref={fileRef}
        accept="image/gif,image/png,image/jpeg"
        onChange={uploadAvatarHandler}
        style={{ display: "none" }}
      />
    </>
  );
}

export default UpdateAvatar;
