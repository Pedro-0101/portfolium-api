import { ApiProperty } from '@nestjs/swagger';
import { ResponseGetUserDto } from 'src/user/dto/responseGetUser.dto';

export class ResponseAuthDto {
  @ApiProperty({
    name: 'token',
    description: 'Token jwt de autenticacao',
  })
  token: string;
  @ApiProperty({
    name: 'user',
    description: 'Usuario autenticado',
  })
  user: ResponseGetUserDto;
}
