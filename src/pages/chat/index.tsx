import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/chat.module.less";
import Header from "@shared/header";
import Back from "@shared/back";
import GeekIcon from "@shared/geekIcon";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { tokenSelector } from "@slice/credential";
import classNames from "classnames";
interface Message {
  type: "robot" | "user";
  message: string;
}
function Chat() {
  const token = useSelector(tokenSelector);
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const socket = io("http://toutiao.itheima.net", {
      query: {
        token,
      },
      transports: ["websocket"],
    });
    socketRef.current = socket;
    socket.on("connect", () => {
      setMessages([
        { type: "robot", message: "您好，小智同学为您服务。" },
        {
          type: "robot",
          message: "请问有什么可以帮您",
        },
      ]);
      console.log("websocket 链接成功");
    });
    socket.on("disconnect", () => {
      console.log("websocket 断开链接");
    });
    // 监听服务端的响应数据
    socket.on("message", (res) => {
      // 将消息保存到本地
      setMessages((messages) => [
        ...messages,
        { type: "robot", message: res.msg },
      ]);
    });
  }, [token]);
  const sendMsg = () => {
    // 向服务器端发送消息
    socketRef.current?.emit("message", {
      msg: message,
      timestamp: Date.now() + "",
    });
    // 将用户发的消息添加到本地消息列表
    setMessages([...messages, { type: "user", message }]);
    // 清空用户输入框里的值
    setMessage("");
  };
  const scrollRef = useRef<HTMLUListElement | null>(null);
  // 消息变化滚动到底部
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div className={styles.chat}>
      <Header
        title={"小智同学"}
        left={<Back onClick={() => socketRef.current?.disconnect()} />}
      />
      <ul className={styles.content} ref={scrollRef}>
        {messages.map((item) =>
          item.type === "robot" ? (
            <li>
              <div className={styles.avatar}>
                <GeekIcon type={"iconbtn_xiaozhitongxue"} />
              </div>
              <div className={styles.say}>{item.message}</div>
            </li>
          ) : (
            <li className={styles.customer}>
              <div className={styles.avatar}>
                <img
                  src={"http://toutiao.itheima.net/images/user_head.jpg"}
                  alt={""}
                />
              </div>
              <div className={styles.say}>{item.message}</div>
            </li>
          )
        )}
      </ul>
      <div className={styles.footer}>
        <div className={styles.edit}>
          <GeekIcon type={"iconbianji"} />
          <input
            type="text"
            placeholder="请描述你的问题"
            value={message}
            onChange={(event) => setMessage(event.currentTarget.value)}
          />
        </div>
        <button onClick={sendMsg}>发送</button>
      </div>
    </div>
  );
}

export default Chat;
