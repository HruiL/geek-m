type Article = {
  // 文章ID
  art_id: string;
  // 文章标题
  title: string;
  // 发布日期
  pubdate: string;
  // 作者id
  aut_id: string;
  // 作者名
  aut_name: string;
  // 作者头像url 无图片，默认为null
  aut_photo: string;
  // 是否关注了作者
  is_followed: boolean;
  // 用户对文章的态度, -1: 取消点赞，1-点赞
  attitude: -1 | 1;
  // 文章内容
  content: string;
  // 是否收藏了文章
  is_collected: boolean;
  // 阅读量
  read_count: number;
} & News;
type ArticleResponse = GeekResponse<Article>;
