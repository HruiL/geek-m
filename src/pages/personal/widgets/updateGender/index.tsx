import React, { useEffect } from "react";
import styles from "@styles/personal.module.less";
import { SlideRef } from "@shared/slide";
import { useUpdateProfileMutation } from "@service/user";
import toast from "react-hot-toast";
interface Props {
  slideRef: React.RefObject<SlideRef | null>;
}
function UpdateGender({ slideRef }: Props) {
  const [updateProfile, { isSuccess }] = useUpdateProfileMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("性别修改成功");
      slideRef.current?.close();
    }
  }, [isSuccess, slideRef]);
  return (
    <ul className={styles.list}>
      <li onClick={() => updateProfile({ gender: 0 })}>男</li>
      <li onClick={() => updateProfile({ gender: 1 })}>女</li>
      <li onClick={() => slideRef.current?.close()}>取消</li>
    </ul>
  );
}

export default UpdateGender;
