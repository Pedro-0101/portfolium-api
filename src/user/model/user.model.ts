import { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'avatarurl.com' })
  avatar_url: string;

  @Prop({ required: true, default: 'bannerurl.com' })
  banner_url: string;

  @Prop({ required: false })
  github_user?: string;

  @Prop({ required: false })
  google_user?: string;

  @Prop({ required: false })
  microsoft_user?: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: false })
  location: string;

  @Prop({ required: false })
  about: string;

  @Prop({ required: true })
  occupation: string;

  @Prop({ required: false })
  tags: string[];

  @Prop({ required: false })
  projects: string[];

  @Prop({ required: false })
  comunities: string[];

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  theme: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  notifications: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type userDocument = HydratedDocument<User>;
