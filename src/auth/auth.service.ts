import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUsernamePassRepository } from 'src/user/repositories/getUsernamePass.repository';
import * as bcrypt from 'bcrypt';
import { GetUserService } from 'src/user/service/getUser.service';
import { ResponseAuthDto } from './dto/responseAuth.dto';
import { ResponseGetUserDto } from 'src/user/dto/responseGetUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly getUsernamePassRepository: GetUsernamePassRepository,
    private readonly getUserService: GetUserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<ResponseAuthDto> {
    const user = await this.getUsernamePassRepository.execute(username);

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
    const token: string = await this.jwtService.signAsync(payload);
    const authUser: ResponseGetUserDto = await this.getUserService.execute(
      user.id,
    );

    const responseUser: ResponseAuthDto = {
      token: token,
      user: authUser,
    };

    return responseUser;
  }
}
