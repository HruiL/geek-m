import React from "react";
import styles from "@styles/article.module.less";
import { useFollowUserMutation, useUnFollowUserMutation } from "@service/user";
import classNames from "classnames";
interface Props {
  isFollow: boolean;
  useId: string;
}
function FollowBtn({ isFollow, useId }: Props) {
  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();
  return (
    <div className={styles.follow}>
      <button
        onClick={() => {
          isFollow ? unFollowUser(useId) : followUser({ target: useId });
        }}
        className={classNames({ [styles.active]: isFollow })}
      >
        {isFollow ? "已关注" : "+关注"}
      </button>
    </div>
  );
}

export default FollowBtn;
