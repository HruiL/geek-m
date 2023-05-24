interface Channel {
  id: number;
  name: string;
}
type ChannelResponse = GeekResponse<{ channels: Channel[] }>;
