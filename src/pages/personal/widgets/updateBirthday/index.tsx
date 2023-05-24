import React, { useEffect, useState } from "react";
import { SlideRef } from "@shared/slide";
import styles from "@styles/personal.module.less";
import { DatePicker } from "antd-mobile";
import dayjs from "dayjs";
import { useUpdateProfileMutation } from "@service/user";
import Loading from "@shared/loading";
import toast from "react-hot-toast";
interface Props {
  slideRef: React.RefObject<SlideRef | null>;
  birthday: string;
}
function UpdateBirthday({ slideRef, birthday }: Props) {
  const [visible, setVisible] = useState(true);
  const [updateProfile, { isSuccess, isLoading }] = useUpdateProfileMutation();
  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
      toast.success("生日修改成功");
      slideRef.current?.close();
    }
  }, [isSuccess, slideRef]);
  return (
    <li>
      <div className={styles.value} onClick={() => setVisible(true)}></div>
      <DatePicker
        title="选择生日"
        visible={visible}
        onClose={() => setVisible(false)}
        defaultValue={dayjs(birthday).toDate()}
        max={new Date()}
        min={new Date(1900, 0, 1, 0, 0, 0)}
        onConfirm={(date) =>
          updateProfile({ birthday: dayjs(date).format("YYYY-MM-DD") })
        }
        onCancel={() => slideRef.current?.close()}
      />
      {isLoading && <Loading />}
    </li>
  );
}

export default UpdateBirthday;
