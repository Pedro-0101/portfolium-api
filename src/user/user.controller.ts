import { Controller, Get, Headers } from '@nestjs/common';
import { GetGitUserInfoService } from './service/getGitUserInfo.service';

@Controller('user')
export class UserController {
  constructor (
    private readonly getGitUserInfoService: GetGitUserInfoService
  ) {}

  @Get()
  async getGitUserInfo(@Headers('authorization') auth: string) {
    console.log('Auth recebido no endpoint: ' + auth)
    const user = await this.getGitUserInfoService.execute( auth );
    console.log('Informacao retornada do usuario: ')
    console.log(user);
    return user;
  }
}
