import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  MongooseModule.forRoot(
      process.env.MONGO_URI as string,
    ),
  ProjectModule,],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
