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

  @Prop({ required: true })
  avatar_url: string;

  @Prop({ required: true })
  github_user?: string;

  @Prop({ required: true })
  google_user?: string;

  @Prop({ required: true })
  microsoft_user?: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  ocupation: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  projects: string[];

  @Prop({ required: true })
  status: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
export type userDocument = HydratedDocument<User>;
