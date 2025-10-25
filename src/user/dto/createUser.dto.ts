import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from 'class-validator'
import countries from '../../util/countries.json'

const countryName = countries.map(c => c.nome_pais_int);

export class CreateUserDto {
  @ApiProperty({
    example: 'Usuario da Silva'
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'O nome deve conter entre 3 e 50 caracteres'
  })
  name: string;
  
  @ApiProperty({
    example: 'email.email@email.com'
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SenhaForte!'
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'A senha deve conter entre 3 e 50 caracteres'
  })
  password: string;

  @ApiProperty({
    example: 'Brazil'
  })
  @IsString()
  @IsIn(countryName, {
    message: 'Pais invalido'
  })
  country: string;
  
  @ApiProperty({
    example: 'Estudante'
  })
  @IsString()
  @Length(3, 50, {
    message: 'A ocupacao deve conter entre 3 e 50 caracteres'
  })
  occupation: string;

  @ApiProperty({
    example: 'Ativo'
  })
  @IsString()
  @IsIn(['Ativo', 'Inativo'], {
    message: 'O status nao e um status valido'
  })
  status: string;
}
