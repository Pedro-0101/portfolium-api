import { Injectable } from '@nestjs/common';
import { CreateUserRepository } from '../repositories/createUser.repository';
import { CreateUserDto } from '../dto/createUser.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async execute(user: CreateUserDto): Promise<UserDto> {
    const createdUser = await this.createUserRepository.execute(user);
    return createdUser;
  }
}
