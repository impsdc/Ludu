import React, { createContext } from 'react';
import { UserCreate } from '../models/states/User';
interface IContext {
  user: UserCreate | null;
  setUser: React.Dispatch<React.SetStateAction<UserCreate>>;
}
export const RegisterContext = createContext<IContext | null>(null);
