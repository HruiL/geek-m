import React, { ChangeEventHandler, useEffect, useState } from "react";
import styles from "@styles/personal.module.less";
import Header from "@shared/header";
import GeekIcon from "@shared/geekIcon";
import { SlideRef } from "@shared/slide";
import Textarea from "react-textarea-autosize";
import { useUpdateProfileMutation } from "@service/user";
import Loading from "@shared/loading";
import toast from "react-hot-toast";
interface Props {
  intro: string;
  slideRef: React.RefObject<SlideRef>;
}

function UpdateIntro({ intro, slideRef }: Props) {
  // Textarea要求绑定的value值不能为null值，如果本身用户资料没有填写个人简介，那么传递过来的就是null，会报错，所以给Textarea一个默认值空字符串,给状态设置默认值，用到了状态函数
  const [value, setValue] = useState(() => (intro ? intro : ""));
  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();
  // 修改用户个人简介
  const updateIntroHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const text = event.currentTarget.value;
    if (text.length > 100) return;
    setValue(text);
  };
  // 监听简介是否修改成功
  useEffect(() => {
    if (isSuccess) {
      // 给用户成功的提示
      toast.success("个人简介修改成功");
      // 关闭弹框
      slideRef.current?.close();
    }
  }, [isSuccess, slideRef]);
  return (
    <div className={styles.content}>
      <Header
        title={"编辑简介"}
        left={
          <GeekIcon
            type={"iconfanhui"}
            className={styles.icon}
            onClick={slideRef.current?.close}
          />
        }
        right={
          <button
            className={styles.submit}
            onClick={() => updateProfile({ intro: value })}
          >
            提交
          </button>
        }
      />
      {isLoading && <Loading />}
      <form>
        <div className={styles.bg}>
          <Textarea
            className={styles.textarea}
            value={value}
            onChange={updateIntroHandler}
          ></Textarea>
          <div className={styles.count}>{value.length}/100</div>
        </div>
      </form>
    </div>
  );
}

export default UpdateIntro;
