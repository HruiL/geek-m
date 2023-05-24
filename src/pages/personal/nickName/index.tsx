import React, { useRef } from "react";
import styles from "@styles/personal.module.less";
import GeekIcon from "@shared/geekIcon";
import Slide, { SlideRef } from "@shared/slide";
import UpdateNickName from "@pages/personal/widgets/updateNickName";
interface Props {
  name: string;
}
function NickName({ name }: Props) {
  const slideRef = useRef<SlideRef | null>(null);
  return (
    <li>
      <span>昵称</span>
      <div className={styles.value} onClick={() => slideRef.current?.open()}>
        <span>{name}</span>
        <GeekIcon type="iconbtn_right" className={styles.icon} />
      </div>
      <Slide ref={slideRef} direction={"toLeft"}>
        <UpdateNickName name={name} slideRef={slideRef} />
      </Slide>
    </li>
  );
}

export default NickName;
