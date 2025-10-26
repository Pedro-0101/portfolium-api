import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUsernamePassRepository } from 'src/user/repositories/getUsernamePass.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly getUsernamePassRepository: GetUsernamePassRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.getUsernamePassRepository.execute(username);

    const saltOrRounds = Number(process.env.BCRYPT_ROUNDS) || 10;
    const password = pass;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    if (user?.pass !== hashedPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
