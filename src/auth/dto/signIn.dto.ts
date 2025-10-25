import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'UserName' })
  @Transform(({ obj }) => obj.username ?? obj.Username ?? obj.user ?? obj.User)
  @IsString()
  username: string;

  @ApiProperty({ example: 'SenhaForte!' })
  @Transform(({ obj }) => obj.password ?? obj.Password ?? obj.pass ?? obj.Pass)
  @IsString()
  password: string;
}