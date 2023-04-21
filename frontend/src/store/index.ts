import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from './reducers';
import { emptySplitApi as api } from '../services/LUDU_API/api';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api.middleware],
  devTools: true,
});
setupListeners(store.dispatch);

export default store;
