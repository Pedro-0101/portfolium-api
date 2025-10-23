import { ProjectDto } from "src/project/dtos/project.dto";

export class UserDto {
  name: string;
  email: string;
  password: string;
  avatar_url: string;
  // TODO: Criar modelos para users
  github_user?: string;
  google_user?: string;
  microsoft_user?: string;
  country: string;
  location: string;
  about: string;
  ocupation: string;
  interests_tags: string[];
  projects: ProjectDto[];
  status: string;
}