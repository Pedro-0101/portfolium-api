import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthGitService } from './service/authGit.service';
import { AuthController } from './auth.controller';
import { GetGitUserInfoService } from 'src/user/service/getGitUserInfo.service';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthGitService, GetGitUserInfoService
  ],
  exports: [
    AuthGitService, GetGitUserInfoService
  ]
})
export class AuthModule {}
