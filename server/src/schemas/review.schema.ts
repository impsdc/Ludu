import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types, Document } from 'mongoose';
import { Transform } from 'class-transformer';
import { User } from './user.schema';
import { Game } from './game.schema';
import { Store } from './store.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Transform(({ value }) => value.toString())
  _id: ObjectId | string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  review: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, immutable: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Game', default: null, immutable: true })
  game: Game;

  @Prop({ type: Types.ObjectId, ref: 'Store', default: null, immutable: true })
  store: Store;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.pre<ReviewDocument>('validate', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const review = this;
  if (
    (review.game && review.store !== null) ||
    (!review.game && !review.store) ||
    (review.game !== null && review.store)
  )
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'At least and Only one field(Game, Store) should be populated',
      },
      HttpStatus.BAD_REQUEST,
    );
  next();
});
