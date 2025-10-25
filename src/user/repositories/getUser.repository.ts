import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from '../model/user.model';
import { ResponseGetUserDto } from '../dto/responseGetUser.dto';

@Injectable()
export class GetUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async execute(id: string): Promise<ResponseGetUserDto> {
    const foundUser = await this.userModel.findById(id).exec();

    if (!foundUser) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    return {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      avatar_url: foundUser.avatar_url,
      country: foundUser.country,
      occupation: foundUser.occupation,
    } satisfies ResponseGetUserDto;
  }
}
