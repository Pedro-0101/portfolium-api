import { applyDecorators, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { ResponseCreatedUserDto } from '../dto/responseCreatedUserDto';

export function CreateUserDecorator(): MethodDecorator {
  return applyDecorators(
    Post(),
    Public(),
    UsePipes(new ValidationPipe({ transform: true })),
    ApiOperation({
      summary: 'Cria um usuário',
      description: 'Cria um usuário, somente campos essenciais',
    }),
    ApiResponse({
      status: 201,
      description: 'Usuário criado com sucesso',
      type: ResponseCreatedUserDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Não foi possível criar o usuário',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}
