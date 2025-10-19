import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [UserModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // torna disponível em toda a aplicação
    }),
    HttpModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
