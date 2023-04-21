import { SET_CURRENT_LOCATION } from '../types/currentLocationTypes';
import { Location } from '../../models/states/Location';
import { Action } from '../../models/Action';

const initialState: Location = {
  latitude: 0,
  longitude: 0,
  zipCode: null,
};

const currentLocationReducer = (state = initialState, action: Action<any>) => {
  switch (action.type) {
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        zipCode: action.payload.zipCode,
      };
    default:
      return state;
  }
};
export default currentLocationReducer;
