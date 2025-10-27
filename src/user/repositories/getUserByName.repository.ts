import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from '../model/user.model';
import { Model } from 'mongoose';

@Injectable()
export class GetUserByNameRepository {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async execute(name: string): Promise<userDocument | null> {
    const foundUser = await this.userModel
      .findOne({
        name: name,
      })
      .exec();

    if (!foundUser) {
      return null;
    }

    return foundUser.toObject();
  }
}
