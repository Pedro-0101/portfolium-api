import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetGitUserInfoService } from './service/getGitUserInfo.service';
import express from 'express';
import { UserDto } from './dto/user.dto';
import { CreateUserService } from './service/createUser.service';
import { CreateUserDto } from './dto/createUser.dto';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatedUserModel } from './apiModel/createdUser.apiModel';
import { GetUserService } from './service/getUser.service';
import { ResponseGetUserApi } from './apiModel/responseGetUser.apiModel';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor(
    private readonly getGitUserInfoService: GetGitUserInfoService,
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
  ) {}

  @Get('github')
  @ApiOperation({
    summary: 'Endpoint que retorna dados do github do usuario',
    description:
      'Verifica se o header possui o token de validacao do github e entao faz a requisicao das informacoes a api do github',
  })
  @ApiResponse({
    status: 200,
    description:
      'Retorna dados do usuario refentes ao gitHub, como nome, email, avatar, numero de repositorios, ultimo commit, etc...',
  })
  @ApiResponse({
    status: 401,
    description: 'Authorization fornecida nao e valida',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token validado do github',
    required: true,
  })
  async getGitUserInfo(@Req() req: express.Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Authorization header ausente ou malformado');
    }
    const auth = authHeader;
    const user = await this.getGitUserInfoService.execute(auth);
    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: 'Cria um usuario',
    description: 'Cria um usuario, somente campos essenciais',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario criado com sucesso',
    type: CreatedUserModel,
  })
  @ApiResponse({
    status: 400,
    description: 'Nao foi possivel criar o usuario',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
  })
  async createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    const createdUser = await this.createUserService.execute(user);
    return createdUser;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtem um usuario especifico',
    description:
      'Obtem dados basicos de um usuario espcifico com base no id passado como parametro',
  })
  @ApiParam({
    name: 'id',
    description: 'Id do usuario',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuario',
    type: ResponseGetUserApi,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async getUser(@Param('id') id: string) {
    const user = await this.getUserService.execute(id);
    return user;
  }
}
