import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from '../model/user.model';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { CreateCompleteUserDto } from '../dto/createCompleteUser.dto';

@Injectable()
export class CreateUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async execute(user: CreateCompleteUserDto): Promise<userDocument> {
    const createdUser = new this.userModel(user);
    await createdUser.save();
    return createdUser.toObject();
  }
}
