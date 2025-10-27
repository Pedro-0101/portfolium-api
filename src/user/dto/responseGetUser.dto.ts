import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseGetUserDto {
  @ApiProperty({
    name: 'username',
    description: 'Username do usuario',
    example: 'Usuario',
  })
  @Expose()
  name: string;

  @Expose()
  @ApiProperty({
    name: 'avatar_url',
    description: 'link da imagem usada no avatar do usuario',
    example: 'https://i.imgur.com/bBddxDW.png',
  })
  avatar_url: string;

  @Expose()
  @ApiProperty({
    name: 'banner_url',
    description: 'link da imagem usada no banner do usuario',
    example: 'https://i.imgur.com/cOqQdiT.png',
  })
  banner_url: string;

  @Expose()
  @ApiProperty({
    name: 'followers',
    description: 'Quantidade de seguidores do usuario',
    example: 500,
  })
  followers: number;

  @Expose()
  @ApiProperty({
    name: 'following',
    description: 'Quantidade de perfis que o usuario segue',
    example: 600,
  })
  following: number;

  @Expose()
  @ApiProperty({
    name: 'communities',
    description: 'Comunidades que o usuario faz parte',
    example: [
      'Comunidade_da_anno_1800',
      'cs da patifaria',
      'Jogadores de lol brasil',
    ],
  })
  comunities: string[];

  @Expose()
  @ApiProperty({
    name: 'theme',
    description: 'Thema de interface de preferencia do usuario',
    example: 'Dark',
  })
  theme: string;

  @Expose()
  @ApiProperty({
    name: 'language',
    description: 'Linguagem de preferencia do usuario',
    example: 'pt-br',
  })
  language: string;

  @Expose()
  @ApiProperty({
    name: 'notifications',
    description: 'Preferencia do usuario sobre receber notificacao',
    example: true,
  })
  notifications: boolean;
}
