import { Injectable } from '@nestjs/common';
import { CreateUserRepository } from '../repositories/createUser.repository';
import { CreateUserEssentialDto } from '../dto/createUserEssential.dto';
import { UserDto } from '../dto/user.dto';
import { CreateCompleteUserDto } from '../dto/createCompleteUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async execute(userDto: CreateUserEssentialDto): Promise<any> {
    // Fazendo hash da senha
    const saltOrRounds = Number(process.env.BCRYPT_ROUNDS) || 10;
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

    const createdUser = await this.createUserRepository.execute(CompleteUser);

    console.log(createdUser);

    return createdUser;
  }
}
