import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GetUserRepository } from '../repositories/getUser.repository';
import mongoose from 'mongoose';
import { ResponseGetUserDto } from '../dto/responseGetUser.dto';

@Injectable()
export class GetUserService {
  constructor(private readonly getUserRepository: GetUserRepository) {}

  async execute(id: string): Promise<ResponseGetUserDto> {
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('ID ausente ou inválido');
    }

    const cleanId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(cleanId)) {
      throw new BadRequestException('O id passado nao e um id valido');
    }

    const userDto = await this.getUserRepository.execute(cleanId);

  if(!userDto || userDto === undefined) {
    throw new NotFoundException('Usuario nao encontrado')
  }

    const userApi: ResponseGetUserDto = userDto;
    return userApi;
  }
}
