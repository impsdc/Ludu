import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { Category } from './category.schema';
import { Review } from './review.schema';

export type GameDocument = Game & Document;

export class Tags {
  @Prop({ required: true })
  players: number[];

  @Prop({ required: true })
  playTime: number;

  @Prop({ default: null })
  meanReviews: number | null;
}

@Schema({ timestamps: true })
export class Game {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, unique: true, immutable: true })
  ean: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  likes: number;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ type: Tags })
  tags: Tags;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Category' })
  categories: Category[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Review', default: [] })
  reviews: Review[];
}

export const GameSchema = SchemaFactory.createForClass(Game);

GameSchema.pre<GameDocument>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const game = this;
  game.tags.meanReviews = null;
  next();
});
