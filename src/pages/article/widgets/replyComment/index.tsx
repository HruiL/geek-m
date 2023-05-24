import React, { useRef, useState } from "react";
import styles from "@styles/article.module.less";
import Slide, { SlideRef } from "@shared/slide";
import GeekIcon from "@shared/geekIcon";
import Header from "@shared/header";
import Textarea from "react-textarea-autosize";
import { FillinOutline } from "antd-mobile-icons";
import { usePubCommentToArticleMutation } from "@service/article";
import { useParams } from "react-router-dom";
interface Props {
  com_id: string;
  name: string;
  resetCommentPlay: () => void;
}
function ReplyComment({ name, com_id, resetCommentPlay }: Props) {
  const slideRef = useRef<SlideRef | null>(null);
  const [content, setContent] = useState("");
  const [replyComment] = usePubCommentToArticleMutation();
  const { id } = useParams();
  const pubHandler = () => {
    replyComment({ target: com_id, content, art_id: id })
      .unwrap()
      .then(() => {
        slideRef.current?.close();
        setContent("");
        resetCommentPlay();
      });
  };
  return (
    <>
      <div
        className={styles.sofa}
        style={{ width: "71vw" }}
        onClick={() => slideRef.current?.open()}
      >
        <FillinOutline className={styles.icon} />
        <span>写回复</span>
      </div>
      <Slide ref={slideRef} direction={"toTop"}>
        <div className={styles.publish}>
          <Header
            title="回复评论"
            left={
              <GeekIcon
                type="iconfanhui"
                style={{ width: "4.5333vw", height: "4.5333vw" }}
                onClick={() => slideRef.current?.close()}
              />
            }
            right={
              <button onClick={pubHandler} className={styles.pubBtn}>
                发表
              </button>
            }
          />
          <Textarea
            minRows={4}
            autoFocus
            placeholder={`@${name}`}
            className={styles.textarea}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      </Slide>
    </>
  );
}

export default ReplyComment;
