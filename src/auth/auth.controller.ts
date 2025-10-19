import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthGitService } from './service/authGit.service';
import { gitAuthTokenDto } from './dto/gitAuthToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authGitService: AuthGitService) {}
  @Get('github')
  @Redirect()
  async githubAuth() {
    console.log(
      `Acessando enpoint: https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user`,
    );
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user`;
    return { url }; // o Nest faz o redirecionamento
  }

  @Get('gitresponse')
  async getGithubCode(@Query('code') code: string) {
    if (!code) {
      throw new Error('Invalid code');
    }
    console.log(`Resposta do github code: ${code}`);
    const token: gitAuthTokenDto = await this.authGitService.executeAuth(code);
    return token;
  }
}
