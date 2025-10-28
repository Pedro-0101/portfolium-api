import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    const userRepository = await this.getUserRepository.execute(cleanId);

    if (!userRepository || userRepository === undefined) {
      throw new NotFoundException('Usuario nao encontrado');
    }
    // TODO: Funcao para retornar numero de followers e following
    const responseUser: ResponseGetUserDto = {
      id: String(userRepository._id),
      name: userRepository.name,
      avatar_url: userRepository.avatar_url,
      banner_url: userRepository.banner_url,
      followers: 0,
      following: 0,
      comunities: userRepository.comunities,
      theme: userRepository.theme,
      language: userRepository.language,
      notifications: userRepository.notifications,
    };

    return responseUser;
  }
}
