import React from "react";
import Channel from "@pages/home/widgets/channel";
import News from "@pages/home/widgets/news";
function HomePage() {
  // 如果用户登录了 则渲染用户频道列表，
  return (
    <>
      <Channel />
      <News />
    </>
  );
}

export default HomePage;
