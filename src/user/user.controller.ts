import express from 'express';
import { Body, Param, Req } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { CreateUserEssentialDto } from './dto/createUserEssential.dto';

import { GetGitUserInfoService } from './service/getGitUserInfo.service';
import { CreateUserService } from './service/createUser.service';
import { GetUserService } from './service/getUser.service';

import { CreateUserDecorator } from './decorators/createUser.post.decorator';
import { GetGitUserInfoDecorator } from './decorators/getGitUserInfo.get.decorator';
import { GetUserByIdDecorator } from './decorators/getUserById.get.decorator';
import { UserControllerDecorator } from './decorators/userController.decorator';

@UserControllerDecorator()
export class UserController {
  constructor(
    private readonly getGitUserInfoService: GetGitUserInfoService,
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
  ) {}

  @GetGitUserInfoDecorator()
  async getGitUserInfo(@Req() req: express.Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Authorization header ausente ou malformado');
    }
    const auth = authHeader;
    const user = await this.getGitUserInfoService.execute(auth);
    return user;
  }

  @CreateUserDecorator()
  async createUser(@Body() user: CreateUserEssentialDto): Promise<UserDto> {
    const createdUser = await this.createUserService.execute(user);
    return createdUser;
  }

  @GetUserByIdDecorator()
  async getUser(@Param('id') id: string) {
    const user = await this.getUserService.execute(id);
    return user;
  }
}
