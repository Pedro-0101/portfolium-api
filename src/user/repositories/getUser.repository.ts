import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from '../model/user.model';

@Injectable()
export class GetUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async execute(id: string): Promise<userDocument> {
    const foundUser = await this.userModel.findById(id).exec();

    if (!foundUser) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    return foundUser.toObject();
  }
}
