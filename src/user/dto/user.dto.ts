import { ProjectDto } from 'src/project/dtos/project.dto';

export class UserDto {
  name: string;
  email: string;
  avatar_url?: string;
  github_user?: string;
  google_user?: string;
  microsoft_user?: string;
  country: string;
  location: string;
  about?: string;
  ocupation: string;
  tags?: string[];
  projects?: string[];
  status: string;
}
