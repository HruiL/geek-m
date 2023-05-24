import React, { useRef } from "react";
import styles from "@styles/personal.module.less";
import GeekIcon from "@shared/geekIcon";
import Slide, { SlideRef } from "@shared/slide";
import UpdateBirthday from "@pages/personal/widgets/updateBirthday";
interface Props {
  birthday: string;
}
function Birthday({ birthday }: Props) {
  const slideRef = useRef<SlideRef | null>(null);
  return (
    <li>
      <span>生日</span>
      <div className={styles.value} onClick={() => slideRef.current?.open()}>
        <span>{birthday}</span>
        <GeekIcon type="iconbtn_right" className={styles.icon} />
      </div>
      <Slide ref={slideRef} direction={"toTop"}>
        <UpdateBirthday slideRef={slideRef} birthday={birthday} />
      </Slide>
    </li>
  );
}

export default Birthday;
