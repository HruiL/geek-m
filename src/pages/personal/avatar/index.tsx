import React, { useRef } from "react";
import GeekIcon from "@shared/geekIcon";
import styles from "@styles/personal.module.less";
import Slide, { SlideRef } from "@shared/slide";
import UpdateAvatar from "@pages/personal/widgets/updateAvatar";
interface Props {
  avatar: string;
}
function Avatar({ avatar }: Props) {
  const slideRef = useRef<SlideRef | null>(null);
  return (
    <>
      <li>
        <span>头像</span>
        <div className={styles.value} onClick={() => slideRef.current?.open()}>
          <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
          </div>
          <GeekIcon type="iconbtn_right" className={styles.icon} />
        </div>
      </li>
      <Slide ref={slideRef} direction={"toTop"}>
        <UpdateAvatar slideRef={slideRef} />
      </Slide>
    </>
  );
}

export default Avatar;
