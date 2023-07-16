import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sickReducer from './sickReducer';
import { useDispatch } from 'react-redux';

const reducer = combineReducers({ sickReducer: sickReducer });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();
