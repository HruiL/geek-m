import React, { useEffect, useState } from "react";
import styles from "@styles/personal.module.less";
import Header from "@shared/header";
import { SlideRef } from "@shared/slide";
import { useUpdateProfileMutation } from "@service/user";
import Loading from "@shared/loading";
import toast from "react-hot-toast";
import Back from "@shared/back";
interface Props {
  name: string;
  slideRef: React.RefObject<SlideRef>;
}
function UpdateNickName({ name, slideRef }: Props) {
  // 用户输入的昵称
  const [value, setValue] = useState(name);
  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();
  // 监听昵称是否修改成功
  useEffect(() => {
    if (isSuccess) {
      // 成功提示
      toast.success("用户昵称修改成功");
      // 关闭弹框
      slideRef.current?.close();
    }
  }, [isSuccess, slideRef]);
  return (
    <div className={styles.content}>
      <Header
        title={"编辑昵称"}
        left={<Back />}
        right={
          <button
            className={styles.submit}
            onClick={() => updateProfile({ name: value })}
          >
            提交
          </button>
        }
      />
      {isLoading && <Loading />}
      <form>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
}

export default UpdateNickName;
