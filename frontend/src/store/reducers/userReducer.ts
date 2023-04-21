import { SET_USER, REMOVE_USER, UPDATE_USER } from '../types/userTypes';
import { Action } from '../../models/Action';

const InitalUserState = {
  token: '',
  id: null,
  username: '',
  role: null,
  email: '',
  phone: '',
  address: '',
  avatar: '',
};

const userReducer = (state = InitalUserState, action: Action<any>) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
        email: action.payload.email,
        phone: action.payload.phone,
        address: action.payload.address,
        avatar: action.payload.avatar,
      };
    case REMOVE_USER:
      return {
        ...state,
        token: '',
        id: null,
        username: '',
        role: null,
        email: '',
        phone: '',
        address: '',
        avatar: '',
      };
    case UPDATE_USER:
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
        email: action.payload.email,
        phone: action.payload.phone,
        address: action.payload.address,
        avatar: action.payload.avatar,
      };
    default:
      return state;
  }
};
export default userReducer;
