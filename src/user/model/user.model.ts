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

  @Prop({ required: false })
  avatar_url: string;

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
  ocupation: string;

  @Prop({ required: false })
  tags: string[];

  @Prop({ required: false })
  projects: string[];

  @Prop({ required: true })
  status: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
export type userDocument = HydratedDocument<User>;
