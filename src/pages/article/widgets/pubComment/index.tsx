import React, { useRef, useState } from "react";
import styles from "@styles/article.module.less";
import { FillinOutline } from "antd-mobile-icons";
import Slide, { SlideRef } from "@shared/slide";
import GeekIcon from "@shared/geekIcon";
import Header from "@shared/header";
import Textarea from "react-textarea-autosize";
import { usePubCommentToArticleMutation } from "@service/article";
import toast from "react-hot-toast";
interface Props {
  id: string;
  resetComment: () => void;
}
function PubComment({ id, resetComment }: Props) {
  const slideRef = useRef<SlideRef | null>(null);
  const [pubComment] = usePubCommentToArticleMutation();
  const [content, setContent] = useState<string>("");

  // 点击发表按钮
  const pubCommentHandler = () => {
    // 发表评论
    pubComment({ target: id, content })
      .unwrap()
      .then(() => {
        slideRef.current?.close();
        toast.success("文章评论发表成功");
        setContent("");
        resetComment();
      });
  };
  return (
    <>
      <div className={styles.sofa} onClick={() => slideRef.current?.open()}>
        <FillinOutline className={styles.icon} />
        <span>去评论</span>
      </div>
      <Slide ref={slideRef} direction={"toTop"}>
        <div className={styles.publish}>
          <Header
            title="发表评论"
            left={
              <GeekIcon
                type="iconfanhui"
                style={{ width: "4.5333vw", height: "4.5333vw" }}
                onClick={() => slideRef.current?.close()}
              />
            }
            right={
              <button className={styles.pubBtn} onClick={pubCommentHandler}>
                发表
              </button>
            }
          />
          <Textarea
            minRows={4}
            autoFocus
            placeholder={"说点什么"}
            className={styles.textarea}
            value={content}
            onChange={(event) => setContent(event.currentTarget.value)}
          />
        </div>
      </Slide>
    </>
  );
}

export default PubComment;
