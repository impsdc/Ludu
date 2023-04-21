import { Category } from './Category';

export declare class Game {
  _id: string;
  ean: string;
  name: string;
  version: string;
  description: string;
  quantity: number;
  likes: number;
  thumbnail: string;
  tags: Tags;
  categories: Category[];
  reviews: string[];
}

export interface Tags {
  playtime: number;
  players: number[];
  meanReviews: number;
}
export interface CreateGamePayload {
  ean: string;
  name: string;
  version: string;
  description: string;
  likes: number;
  tags: Tags;
  categories: string[];
  thumbnail: string;
}
