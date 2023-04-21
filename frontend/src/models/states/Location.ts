import { Store } from './Store';

export interface Location {
  longitude: number;
  latitude: number;
  zipCode?: number;
}

export interface LocationAPI {
  _id: string;
  name: string;
  postalCode: number;
  stores: Store[];
}
