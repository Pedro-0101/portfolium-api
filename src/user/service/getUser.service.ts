import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GetUserRepository } from '../repositories/getUser.repository';
import { ResponseGetUserApi } from '../apiModel/responseGetUser.apiModel';
import mongoose from 'mongoose';

@Injectable()
export class GetUserService {
  constructor(private readonly getUserRepository: GetUserRepository) {}

  async execute(id: string): Promise<ResponseGetUserApi> {
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

    const userApi: ResponseGetUserApi = userDto;
    return userApi;
  }
}
