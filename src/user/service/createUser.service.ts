import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserRepository } from '../repositories/createUser.repository';
import { CreateUserEssentialDto } from '../dto/createUserEssential.dto';
import { CreateCompleteUserDto } from '../dto/createCompleteUser.dto';
import * as bcrypt from 'bcrypt';
import { instanceToInstance } from 'class-transformer';
import { ResponseCreatedUserDto } from '../dto/responseCreatedUserDto';
import { userDocument } from '../model/user.model';
import { GetUserByEmailService } from './getUserByEmail.service';
import { GetUserByNameService } from './getUserByName.service';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly getUserByEmailService: GetUserByEmailService,
    private readonly getUserByNameService: GetUserByNameService,
  ) {}

  async execute(userDto: CreateUserEssentialDto): Promise<any> {
    // Verificar se nome e email nao existem
    const existName = await this.getUserByNameService.execute(userDto.name);
    const existEmail = await this.getUserByEmailService.execute(userDto.email);
    
    if (existName) {
      throw new BadRequestException('Nome ja existente');
    }

    if (existEmail) {
      throw new BadRequestException('Email ja existente');
    }

    // Fazendo hash da senha
    const saltOrRounds = Number(process.env.BCRYPT_ROUNDS);
    const password = userDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    // Definindo valoes padroes do cadastro do usuario
    const defaultAvatarUrl = 'https://i.imgur.com/bBddxDW.png';
    const defaultBannerUrl = 'https://i.imgur.com/cOqQdiT.png';
    const defaultGithubUser = 'none';
    const defaultGoogleUser = 'none';
    const defaultMicrosoftUser = 'none';
    const defaultLocation = '';
    const defaultAboutMe = '';
    const defaultTags = [];
    const defaultProjects = [];
    const defaultComunities = [];
    const defaultStatus = 'Ativo';
    const defaultTheme = 'Dark';
    const defaultLanguage = 'en-us';
    const defaultNotifications = false;

    const CompleteUser: CreateCompleteUserDto = {
      name: userDto.name,
      email: userDto.email,
      password: hashedPassword,
      avatar_url: defaultAvatarUrl,
      banner_url: defaultBannerUrl,
      github_user: defaultGithubUser,
      google_user: defaultGoogleUser,
      microsoft_user: defaultMicrosoftUser,
      country: userDto.country,
      location: defaultLocation,
      about: defaultAboutMe,
      occupation: userDto.occupation,
      tags: defaultTags,
      projects: defaultProjects,
      comunities: defaultComunities,
      status: defaultStatus,
      theme: defaultTheme,
      language: defaultLanguage,
      notifications: defaultNotifications,
    };

    // Aguarda retorno do repositorio
    const createdUser: userDocument =
      await this.createUserRepository.execute(CompleteUser);

    // Transforma no dto para resposta
    const responseCreatedUser = instanceToInstance(
      Object.assign(new ResponseCreatedUserDto(), createdUser),
      {
        excludeExtraneousValues: true,
        exposeUnsetFields: true,
      },
    );

    return responseCreatedUser;
  }
}
