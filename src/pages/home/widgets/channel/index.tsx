import styles from "@styles/channel.module.less";
import GeekIcon from "@shared/geekIcon";
import { useTypedSelector } from "@store/index";
import { tokenSelector } from "@slice/credential";
import UserChannel from "@pages/home/widgets/userChannel";
import GuestChannel from "@pages/home/widgets/guestChannel";
import UpdateUserChannel from "@pages/home/widgets/updateUserChannel";
import Slide, { SlideRef } from "@shared/slide";
import { useRef } from "react";
import UpdateGuestChannel from "@pages/home/widgets/updateGuestChannel";
import { useNavigate } from "react-router-dom";

function Channel() {
  // 获取用户登录凭据
  const token = useTypedSelector(tokenSelector);
  const slideRef = useRef<SlideRef | null>(null);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {token ? <UserChannel /> : <GuestChannel />}
      <div className={styles.aside}>
        <div className={styles.search}>
          <GeekIcon
            type={"iconbtn_search"}
            className={styles.search_icon}
            onClick={() => navigate("/search")}
          />
        </div>
        <div className={styles.menu}>
          <GeekIcon
            type={"iconbtn_channel"}
            className={styles.channel_icon}
            onClick={() => slideRef.current?.open()}
          />
        </div>
        <Slide ref={slideRef} direction={"toRight"}>
          {token ? (
            <UpdateUserChannel slideRef={slideRef} />
          ) : (
            <UpdateGuestChannel slideRef={slideRef} />
          )}
        </Slide>
      </div>
    </div>
  );
}

export default Channel;
