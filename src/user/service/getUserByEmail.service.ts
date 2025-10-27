import { BadRequestException, Injectable } from '@nestjs/common';
import { GetUserByEmailRepository } from '../repositories/getUserByEmail.repository';

@Injectable()
export class GetUserByEmailService {
  constructor(
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
  ) {}

  async execute(email: string) {
    if (!email) {
      throw new BadRequestException('Email vazio ou invalido');
    }

    return await this.getUserByEmailRepository.execute(email);
  }
}
