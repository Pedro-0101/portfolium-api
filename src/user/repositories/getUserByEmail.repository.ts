import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from '../model/user.model';
import { Model } from 'mongoose';

@Injectable()
export class GetUserByEmailRepository {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async execute(email: string): Promise<userDocument | null> {
    const foundUser = await this.userModel
      .findOne({
        email: email,
      })
      .exec();

    if (!foundUser) {
      return null;
    }

    return foundUser.toObject();
  }
}
