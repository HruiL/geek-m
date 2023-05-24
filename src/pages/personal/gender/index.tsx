import React, { useRef } from "react";
import styles from "@styles/personal.module.less";
import GeekIcon from "@shared/geekIcon";
import Slide, { SlideRef } from "@shared/slide";
import UpdateGender from "@pages/personal/widgets/updateGender";
interface Props {
  gender: 0 | 1;
}
function Gender({ gender }: Props) {
  const slideRef = useRef<SlideRef | null>(null);

  return (
    <li>
      <span>性别</span>
      <div className={styles.value} onClick={() => slideRef.current?.open()}>
        <span>{gender === 0 ? "男" : "女"}</span>
        <GeekIcon type="iconbtn_right" className={styles.icon} />
      </div>
      <Slide ref={slideRef} direction={"toTop"}>
        <UpdateGender slideRef={slideRef} />
      </Slide>
    </li>
  );
}

export default Gender;
