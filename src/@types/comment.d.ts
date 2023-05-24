type CommentResponse = GeekResponse<{
  // 该文章的评论总数 或 该评论的回复总数
  total_count: number;
  // 所有评论或回复的最后一个id（截止offset值，小于此值的offset可以不用发送请求获取评论数据，已经没有数据），若无评论或回复数据，则值为NULL
  end_id: string;
  // 本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL
  last_id: string;
  // 评论或回复的内容
  results: CommentType[];
}>;
interface CommentType {
  // 评论或回复id
  com_id: string;
  // 评论或回复的用户id
  aut_id: string;
  // 用户名称
  aut_name: string;
  // 用户头像url
  aut_photo: string;
  // 点赞数量
  like_count: number;
  // 回复数量
  reply_count: number;
  // 创建时间
  pubdate: string;
  // 评论或回复内容
  content: string;
  // 当前用户是否点赞
  is_liking: boolean;
}
interface ReqParams {
  // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
  type: "a" | "c";
  // 源id，文章id或评论id
  source: string;
  // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
  offset?: string | undefined;
  // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
  limit?: number;
}
