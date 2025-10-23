import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: false })
  tags: string[];

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  status: string;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);
export type projectDocument = HydratedDocument<Project>;
