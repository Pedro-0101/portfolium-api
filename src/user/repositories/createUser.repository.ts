import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, userDocument } from "../model/user.model";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class createUserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<userDocument>
  ) {}

  async execute(user: CreateUserDto): Promise<UserDto> {
    const createdUser = new this.userModel(user);
    await createdUser.save()
    return createdUser.toObject();
  }
}