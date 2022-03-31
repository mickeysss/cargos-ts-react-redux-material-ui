import { combineReducers } from 'redux';
import { cargosReducer } from './cargos-reducer';
import { store } from '../index';

export const rootReducer = combineReducers({
    cargos: cargosReducer,
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
