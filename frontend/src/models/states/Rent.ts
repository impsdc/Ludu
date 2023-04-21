import { Copy } from './Copy';
import { User } from './User';

export interface Rent {
  _id: string;
  game: Copy;
  copy: any;
  user: User;
  startDate: Date | string;
  endDate?: string | null;
  deliveredDate?: string | null;
  createdAt: Date | string;
  updatedAt: string | null;
  type: RentType;
}

export interface CreateRentPayload {
  startDate: Date;
  game: any;
  user: string;
  type: RentType;
}

export enum RentStatus {
  OVER = 'OVER',
  ONGOING = 'ONGOING',
  BOOKED = 'BOOKED',
}

export enum RentType {
  HOME = 'HOME',
  STORE = 'STORE',
  USER = 'USER',
}

export type RentStatusToDisplay = ('Over' | 'Ongoing' | 'Booked')[];
