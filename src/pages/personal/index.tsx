import React from "react";
import Header from "@shared/header";
import Back from "@shared/back";
import styles from "@styles/personal.module.less";
import { useGetUserProfileQuery } from "@service/user";
import Loading from "@shared/loading";
import Avatar from "@pages/personal/avatar";
import NickName from "@pages/personal/nickName";
import Intro from "@pages/personal/intro";
import Gender from "@pages/personal/gender";
import Birthday from "@pages/personal/birthday";
import Logout from "@pages/personal/logout";
function Personal() {
  const { data, isLoading, isError, error } = useGetUserProfileQuery(undefined);
  if (isLoading) return <Loading />;
  // 判断是否有错，并且是FetchBaseQueryError错误（请求错误）
  if (isError && "status" in error)
    return <div>{(error.data as GeekResponse<null>).message}</div>;
  if (!data) return <div>暂无数据...</div>;
  const { photo, name, birthday, intro, gender } = data.data;

  return (
    <div className={styles.page}>
      <Header title="个人信息" left={<Back />} />
      <ul className={styles.options}>
        <Avatar avatar={photo} />
        <NickName name={name} />
        <Intro intro={intro} />
      </ul>
      <ul className={styles.options}>
        <Gender gender={gender} />
        <Birthday birthday={birthday} />
      </ul>
      <Logout />
    </div>
  );
}

export default Personal;
