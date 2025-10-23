import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { GetGitUserInfoService } from './service/getGitUserInfo.service';
import express from 'express';
import { UserDto } from './dto/user.dto';
import { CreateUserService } from './service/createUser.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly getGitUserInfoService: GetGitUserInfoService,
    private readonly createUserService: CreateUserService,
  ) {}

  @Get()
  async getGitUserInfo(@Req() req: express.Request) {
    // TODO Adicionar Variaveis de Ambiente para controle de nomes como: chave de acesso do token
    console.log('Requisitando informacao do usuario: ' + req.headers.origin);
    console.log('Tokens: ', req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Authorization header ausente ou malformado');
    }

    const auth = authHeader;
    console.log(`Auth enviado ${auth}`);

    const user = await this.getGitUserInfoService.execute(auth);
    console.log('Informacao retornada do usuario: ');
    console.log(user);
    return user;
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    const createdUser = await this.createUserService.execute(user);
    return createdUser;
  }
}
