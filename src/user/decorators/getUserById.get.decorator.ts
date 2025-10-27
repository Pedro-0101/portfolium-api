import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ResponseGetUserDto } from '../dto/responseGetUser.dto';

export function GetUserByIdDecorator(): MethodDecorator {
  return applyDecorators(
    Get(':id'),
    ApiOperation({
      summary: 'Obtem um usuario especifico',
      description:
        'Obtem dados basicos de um usuario espcifico com base no id passado como parametro',
    }),
    ApiParam({
      name: 'id',
      description: 'Id do usuario',
      required: true,
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: 'Dados do usuario',
      type: ResponseGetUserDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Usuário não encontrado',
    }),
  );
}
