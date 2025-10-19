import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthGitService } from './service/authGit.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthGitService
  ],
  exports: [
    AuthGitService
  ]
})
export class AuthModule {}
