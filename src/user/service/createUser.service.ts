import { Injectable } from "@nestjs/common";
import { createUserRepository } from "../repositories/createUser.repository";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class CreateUserService {
  constructor(
    private readonly createUserRepository: createUserRepository
  ) {}

  async execute(user: CreateUserDto): Promise<UserDto> {
    const createdUser = await this.createUserRepository.execute(user);
    return createdUser;
  }
}