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

    // Verifica se usuário existe
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const storedHash = user.pass;
    if (!storedHash) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // compara a senha plain com o hash armazenado
    const match = await bcrypt.compare(pass, storedHash);
    if (!match) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
