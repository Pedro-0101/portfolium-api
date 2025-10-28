import { applyDecorators, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { ResponseAuthDto } from '../dto/responseAuth.dto';

export function AuthLoginDecorator(): MethodDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    Public(),
    Post('login'),
    ApiResponse({
      status: 200,
      description: 'Retorna token de validacao e dados do usuario',
      type: ResponseAuthDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Credenciais incorretas',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
  );
}
