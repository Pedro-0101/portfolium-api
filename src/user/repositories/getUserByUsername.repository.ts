import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, userDocument } from "../model/user.model";
import { UsernamePassDto } from "../dto/usernamePass.dto";


@Injectable()
export class getUserByUsernameRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<userDocument>
  ) {}

  async execute(username: string): Promise<UsernamePassDto> {
    
  }
}