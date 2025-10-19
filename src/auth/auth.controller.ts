import { Controller, Get, Query, Redirect, Req, Res } from '@nestjs/common';
import { AuthGitService } from './service/authGit.service';
import { gitAuthTokenDto } from './dto/gitAuthToken.dto';
import type { Response } from 'express';
import type { Request } from 'express';

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
  async getGithubCode(
    @Req() req: Request,
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
      secure: process.env.NODE_ENV === 'production' ? false : true,
      sameSite: 'lax',
      maxAge: 60 * 1000,
    });

    return 'Success';
  }
}
