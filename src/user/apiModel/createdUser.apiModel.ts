import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserModel {
  @ApiProperty({
    description: 'Nome do usuario',
    example: 'Usuario'
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuario',
    example: 'email@email.com'
  })
  email: string;

  @ApiProperty({
    description: 'Pais do usuario',
    example: 'Brasil'
  })
  country: string;

  @ApiProperty({
    description: 'Ocupacao do usuario [estudante, desenvolvedor, ...]',
    example: 'Estudante'
  })
  ocupation: string;

  @ApiProperty({
    description: 'Status do usuario [ativo, inativo]',
    example: 'Ativo'
  })
  status: string;
}