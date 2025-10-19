import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { GetGitUserInfoService } from './service/getGitUserInfo.service';

@Module({
  controllers: [UserController],
  imports: [HttpModule],
  providers: [GetGitUserInfoService],
  exports: [GetGitUserInfoService],
})
export class UserModule {}
