import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from 'class-validator';
import countries from '../../util/countries.json';

const countryName = countries.map((c) => c.nome_pais_int);

export class CreateUserEssentialDto {
  @ApiProperty({
    name: 'name',
    example: 'Usuario da Silva',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'O nome deve conter entre 3 e 50 caracteres',
  })
  name: string;

  @ApiProperty({
    name: 'email',
    example: 'email.email@email.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    example: 'SenhaForte!',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'A senha deve conter entre 3 e 50 caracteres',
  })
  password: string;

  @ApiProperty({
    name: 'country',
    example: 'Brazil',
  })
  @IsString()
  @IsIn(countryName, {
    message: 'Pais invalido',
  })
  country: string;

  @ApiProperty({
    name: 'occupation',
    example: 'Estudante',
  })
  @IsString()
  @Length(3, 50, {
    message: 'A ocupacao deve conter entre 3 e 50 caracteres',
  })
  occupation: string;
}
