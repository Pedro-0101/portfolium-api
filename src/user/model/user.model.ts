import { Repo } from "./repo.model";

export class User {
  name: string;
  email: string;
  avatarUrl: string;
  repos: Repo[];
}