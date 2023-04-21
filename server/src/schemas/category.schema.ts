import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
