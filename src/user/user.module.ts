import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { GetGitUserInfoService } from './service/getGitUserInfo.service';
import { CreateUserService } from './service/createUser.service';
import { CreateUserRepository } from './repositories/createUser.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';
import { GetUserService } from './service/getUser.service';
import { GetUserRepository } from './repositories/getUser.repository';

@Module({
  controllers: [UserController],
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    GetGitUserInfoService,
    CreateUserService,
    CreateUserRepository,
    GetUserService,
    GetUserRepository,
  ],
  exports: [
    GetGitUserInfoService,
    CreateUserService,
    CreateUserRepository,
    GetUserService,
    GetUserRepository,
  ],
})
export class UserModule {}
