import React from "react";
import styles from "@styles/updateUserChannel.module.less";
import GeekIcon from "@shared/geekIcon";
import { SlideRef } from "@shared/slide";
import Selected from "@pages/home/widgets/updateUserChannel/selected";
import Unselect from "@pages/home/widgets/updateUserChannel/unselect";

interface Props {
  slideRef: React.RefObject<SlideRef | null>;
}
function UpdateUserChannel({ slideRef }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.close}>
        <GeekIcon
          type={"iconbtn_channel_close"}
          onClick={() => slideRef.current?.close()}
        />
      </div>
      <Selected slideRef={slideRef} />
      <div className={styles.space}></div>
      <Unselect />
    </div>
  );
}

export default UpdateUserChannel;
