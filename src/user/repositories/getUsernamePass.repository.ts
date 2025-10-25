import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from '../model/user.model';
import { UserAuthDto } from '../dto/usernamePass.dto';

@Injectable()
export class GetUsernamePassRepository {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async execute(username: string): Promise<UserAuthDto> {
    const foundUser = await this.userModel
      .findOne({
        name: username,
      })
      .exec();

    if (!foundUser) {
      throw new NotFoundException('Username ou senha incorretos');
    }

    const user = {
      id: foundUser._id as string,
      username: foundUser.name,
      pass: foundUser.password,
    } satisfies UserAuthDto;

    return user;
  }
}
