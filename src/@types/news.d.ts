interface Cover {
  // 封面类型，0-无封面，1-1张封面图片，3-3张封面
  type: 0 | 1 | 2;
  // 封面图片
  images: string[];
}
interface News {
  // 文章id
  art_id: string;
  // 文章标题
  title: string;
  // 作者id
  aut_id: string;
  // 作者名称
  aut_name: string;
  // 评论数量
  comm_count: string;
  // 发布时间
  pubdate: string;
  // 封面
  cover: Cover;
  // 点赞数
  like_count: number;
  // 收藏数
  collect_count: number;
}
// pre_timestamp请求前一页历史数据的时间戳
type NewsResponse = GeekResponse<{ pre_timestamp: string; results: News[] }>;
interface RequestNewsParams {
  // 频道ID
  channel_id: string;
  // 时间戳，请求新的推荐数据传当前的时间戳（第一页数据），请求历史推荐（第二页往后...）传指定的时间戳
  timestamp: string | null;
}
type SearchResult = GeekResponsePagination<News>;
interface RequestResultParams {
  // 页数，不传默认为1
  page?: number;
  // 每页数量，不传每页数量由后端决定
  per_page?: number;
  // 搜索关键词
  q: string;
}
