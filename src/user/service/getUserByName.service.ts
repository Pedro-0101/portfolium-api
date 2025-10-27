import { BadRequestException, Injectable } from '@nestjs/common';
import { GetUserByNameRepository } from '../repositories/getUserByName.repository';

@Injectable()
export class GetUserByNameService {
  constructor(
    private readonly getUserByNameRepository: GetUserByNameRepository,
  ) {}

  async execute(name: string) {
    if (!name) {
      throw new BadRequestException('Name vazio ou invalido');
    }

    return await this.getUserByNameRepository.execute(name);
  }
}
