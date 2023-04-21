import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { Copy } from './copy.schema';
import { User } from './user.schema';
export type RentDocument = Rent & Document;

export enum RENT {
  HOME = 'HOME',
  STORE = 'STORE',
  USER = 'USER',
}

@Schema({ timestamps: true })
export class Rent {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Copy' })
  game: Copy;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Types.ObjectId })
  owner_id: ObjectId;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, default: null })
  endDate: Date | null;

  @Prop({ type: Date, default: null })
  deliveredDate: Date | null;

  @Prop({ type: String, enum: RENT, required: true })
  type: RENT;
}

export const RentSchema = SchemaFactory.createForClass(Rent);
