import { ApiProperty } from "@nestjs/swagger"

export class ResponseGetUserApi {
  @ApiProperty({
    name: 'Id',
    description: 'Id do usuario',
    example: '68fc2a538475713dc81394c4'
  })
  id: string

  @ApiProperty({
    name: 'Name',
    description: 'Nome do usuario',
    example: 'Usuario da silva'
  })
  name: string

  @ApiProperty({
    name: 'Avatar url',
    description: 'Url para imagem do avatar do usuario',
    example: 'https://share.google/images/A1VPDqookgEEaOMcJ'
  })
  avatar_url: string

  @ApiProperty({
    name: 'Email',
    description: 'Email do usuario',
    example: 'email.email@email.com'
  })
  email: string

  @ApiProperty({
    name: 'Country',
    description: 'Pais do usuario',
    example: 'Brazil'
  })
  country: string

  @ApiProperty({
    name: 'Ocupacao',
    description: 'Ocupacao do usuario',
    example: 'Estudante'
  })
  occupation: string
}