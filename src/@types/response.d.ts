interface GeekResponse<T> {
  message: string;
  data: T;
}
// 带分页的返回值
interface GeekResponsePagination {
  data: {
    page: number;
    per_page: number;
    // 文章总数
    total_count: number;
    results: T[];
  };
  message: string;
}
