export class CreateCompleteUserDto {
  name: string;
  email: string;
  password: string;
  avatar_url: string;
  banner_url: string;
  github_user: string;
  google_user: string;
  microsoft_user: string;
  country: string;
  location: string;
  about: string;
  occupation: string;
  tags: string[];
  projects: string[];
  comunities: string[];
  status: string;
  theme: string;
  language: string;
  notifications: boolean;
}
