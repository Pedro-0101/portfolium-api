import { Expose } from 'class-transformer';

export class ResponseCreatedUserDto {
  @Expose()
  name: string;

  @Expose()
  avatar_url: string;

  @Expose()
  banner_url: string;

  @Expose()
  followers: number;

  @Expose()
  following: number;

  @Expose()
  comunities: string[];

  @Expose()
  theme: string;

  @Expose()
  language: string;

  @Expose()
  notifications: boolean;
}
