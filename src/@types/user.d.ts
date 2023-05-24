interface User {
  id: string;
  name: string;
  photo: string;
  mobile: string;
  gender: 0 | 1;
  birthday: string;
  intro: string;
  art_count: number;
  follow_count: number;
  fans_count: number;
  like_count: number;
}
type UserProfileResponse = GeekResponse<User>;
type UploadAvatarResponse = GeekResponse<{ id: string; photo: string }>;
interface UserProfile {
  name: string;
  gender: 0 | 1;
  birthday: string;
  intro: string;
}
