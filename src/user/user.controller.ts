import { Controller, Get, Headers, Req } from '@nestjs/common';
import { GetGitUserInfoService } from './service/getGitUserInfo.service';
import type { Request } from 'express';
@Controller('user')
export class UserController {
  constructor (
    private readonly getGitUserInfoService: GetGitUserInfoService
  ) {}

  @Get()
  async getGitUserInfo(@Req() req: Request, @Headers('authorization') auth: string) {
    // TODO Adicionar Variaveis de Ambiente para controle de nomes como: chave de acesso do token
    const token = req.cookies['git_access_token'];
    console.log('Auth recebido no endpoint: ' + auth)
    const user = await this.getGitUserInfoService.execute(`Bearer ${token ? token : auth}`);
    console.log('Informacao retornada do usuario: ')
    console.log(user);
    return user;
  }
}
