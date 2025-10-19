import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { gitAuthTokenDto } from '../dto/gitAuthToken.dto';

@Injectable()
export class AuthGitService {
  constructor(private readonly httpService: HttpService) {}

  async executeAuth(code: string): Promise<gitAuthTokenDto> {
    //TODO: Fazer tratamento de erro caso o token nao seja retornado
    const url = 'https://github.com/login/oauth/access_token';
    const body = new URLSearchParams({
      client_id: process.env.CLIENT_ID ?? '',
      client_secret: process.env.CLIENT_SECRET ?? '',
      code,
    });
    
    const res = await firstValueFrom(
      this.httpService.post(url, body.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }),
    );

    console.log('Token retornado pelo github: ')
    console.log(res.data);

    const token: gitAuthTokenDto = {
      access_token: res.data.access_token,
      scope: res.data.scope,
      token_type: res.data.token_type
    }

    return token
  }
}
