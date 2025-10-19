import { Controller, Get, Query, Redirect, Req, Res } from '@nestjs/common';
import { AuthGitService } from './service/authGit.service';
import { gitAuthTokenDto } from './dto/gitAuthToken.dto';
import type { Response } from 'express';

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
    return { url };
  }

  @Get('gitresponse')
  //@Redirect()
  async getGithubCode(
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
  ) {
    console.log(`Resposta do github code: ${code}`);
    if (!code) {
      throw new Error('Invalid code');
    }

    const token: gitAuthTokenDto = await this.authGitService.executeAuth(code);

    res.cookie('git_access_token', token.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });

    // const url = 'http://192.168.1.19:5173';
    // return { url };
    return { token }
  }

  @Get('chato')
  async returnCookie(@Res({ passthrough: true }) res: Response) {
    const resp = 'o joao e chorao'
    res.cookie('cookie_aleatorio', resp, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });
  }
}
