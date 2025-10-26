export class ResponseCreatedUserDto {
  name: string;
  avatar_url: string;
  banner_url: string;
  followers: number;
  following: number;
  comunities: string[];
  theme: string;
  language: string;
  notifications: boolean;
}
