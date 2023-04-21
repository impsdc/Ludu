import { Copy } from './Copy';
import { Review } from './Review';
import { Location } from './Location';

export interface Store {
  _id: string;
  iban: string;
  name: string;
  address: string;
  owner: string;
  phone: string;
  location: Location;
  copies: Copy[];
  reviews: Review[];
}

export interface CreateStorePayload {
  location: string;
  phone: string;
  owner: string;
  address: string;
  name: string;
  iban: string;
}
