import { UserDto } from "src/user/dto/user.dto";

export class ProjectDto {
  title: string;
  description: string;
  authors: UserDto[];
  tags: string[];
  content: string;
  status: string;
}