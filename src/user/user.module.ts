import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { GetGitUserInfoService } from './service/getGitUserInfo.service';
import { CreateUserService } from './service/createUser.service';
import { createUserRepository } from './repositories/createUser.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';

@Module({
  controllers: [UserController],
  imports: [HttpModule, MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  providers: [GetGitUserInfoService, CreateUserService, createUserRepository],
  exports: [GetGitUserInfoService, CreateUserService, createUserRepository],
})
export class UserModule {}
