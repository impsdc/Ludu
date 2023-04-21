import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { Game } from './game.schema';

export type CopyDocument = Copy & Document;

@Schema({ timestamps: true })
export class Copy {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Game' })
  game: Game;

  @Prop()
  available: boolean;
}

export const CopySchema = SchemaFactory.createForClass(Copy);

CopySchema.pre<CopyDocument>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const copy = this;
  copy.available = true;
  next();
});
