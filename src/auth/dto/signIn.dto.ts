import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    name: 'username',
    description: 'Username do usuario',
    example: 'Username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    name: 'password',
    description: 'Senha do usuario',
    example: 'SenhaForte!',
  })
  @IsString()
  password: string;
}
