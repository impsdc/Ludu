import { UserState } from '../../models/states/User';
import { SET_USER, REMOVE_USER, UPDATE_USER } from '../types/userTypes';

export const setUser = (userState: UserState) => ({
  type: SET_USER,
  payload: userState,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const updateUser = (userState: UserState) => ({
  type: UPDATE_USER,
  payload: userState,
});
