import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GetGitUserInfoService {
  constructor(private readonly httpService: HttpService) {}

  async execute(auth: string) {
    console.log('Buscando informacoes do usuario')
    const url = 'https://api.github.com/user';

    const res = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: auth,
          Accept: 'application/json',
          'User-Agent': 'NestJS-App',
        },
      }),
    );

    return res.data;
  }
}
