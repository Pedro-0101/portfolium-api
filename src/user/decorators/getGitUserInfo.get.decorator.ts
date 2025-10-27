import { applyDecorators, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiHeader } from "@nestjs/swagger";

export function GetGitUserInfoDecorator(): MethodDecorator {
  return applyDecorators(
    Get('github'),
    ApiOperation({
      summary: 'Endpoint que retorna dados do github do usuario',
      description:
        'Verifica se o header possui o token de validacao do github e entao faz a requisicao das informacoes a api do github',
    }),
    ApiResponse({
      status: 200,
      description:
        'Retorna dados do usuario refentes ao gitHub, como nome, email, avatar, numero de repositorios, ultimo commit, etc...',
    }),
    ApiResponse({
      status: 401,
      description: 'Authorization fornecida nao e valida',
    }),
    ApiResponse({
      status: 500,
      description: 'Erro interno do servidor',
    }),
    ApiHeader({
      name: 'Authorization',
      description: 'Token validado do github',
      required: true,
    }),
  );
}
