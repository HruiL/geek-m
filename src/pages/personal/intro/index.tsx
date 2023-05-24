import React, { useRef } from "react";
import styles from "@styles/personal.module.less";
import GeekIcon from "@shared/geekIcon";
import Slide, { SlideRef } from "@shared/slide";
import UpdateIntro from "@pages/personal/widgets/updateIntro";
interface Props {
  intro: string;
}
function Intro({ intro }: Props) {
  const slideRef = useRef<SlideRef | null>(null);
  return (
    <li>
      <span>简介</span>
      <div className={styles.value} onClick={() => slideRef.current?.open()}>
        <span>{intro || "未填写"}</span>
        <GeekIcon type="iconbtn_right" className={styles.icon} />
      </div>
      <Slide ref={slideRef} direction={"toLeft"}>
        <UpdateIntro intro={intro} slideRef={slideRef} />
      </Slide>
    </li>
  );
}

export default Intro;
