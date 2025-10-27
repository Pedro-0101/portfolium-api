import {
  Body,
  Controller,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthLoginDecorator } from './decorators/signIn.post.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AuthLoginDecorator()
  async signIn(@Body() signInDto: SignInDto) { 
    const jwtToken = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    console.log(jwtToken)
    return jwtToken;
  }
}
