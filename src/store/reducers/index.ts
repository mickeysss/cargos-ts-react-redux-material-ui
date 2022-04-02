import { combineReducers } from 'redux';
import { cargosReducer } from './cargos-reducer';
import { store } from '../index';
import { transitCargoReducer } from './transits-reducer';


export const rootReducer = combineReducers({
    cargos: cargosReducer,
    transitCargo: transitCargoReducer
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
