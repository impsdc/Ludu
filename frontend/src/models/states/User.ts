import { Review } from './Review';
export declare enum ROLES {
  USER = 'USER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}
export type LocalAuth = {
  email: string;
  password?: string;
  emailVerified?: boolean;
};
export type LoginPayload = {
  username: string;
  password: string;
};

export type Credentials = {
  local: LocalAuth;
};

export interface UserCreate {
  _id?: string;
  username?: string;
  credentials?: Credentials;
  role?: string;
  phone?: string;
  avatar?: string;
  address?: string;
}

export interface UserUpdate {
  id: string;
  username?: string;
  credentials?: Credentials;
  phone?: string;
  avatar?: string;
  address?: string;
}

export interface UserState {
  token: string;
  id: string;
  username: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

export interface User extends UserCreate {
  _id: string;
  createdAt: string;
  reviews: Review[] | [];
}

export interface UserFromQuery extends User {
  _id: string;
}

export interface UserLoged {
  token: string;
  refreshToken: string;
  user: UserFromQuery;
}
