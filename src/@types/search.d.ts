interface SearchKey {
  id: string;
  name: string;
}
type SuggestResponse = GeekResponse<{ options: string[] }>;
