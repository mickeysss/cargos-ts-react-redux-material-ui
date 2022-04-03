import {
    ADD_TRANSIT_CARGO,
    COMPLETE_TRANSIT_CARGO,
    EDIT_TRANSIT_CARGO,
    REMOVE_TRANSIT_CARGO,
    transitCargoType,
} from './types';
import { cargoType } from '../cargos-reducer/types';

export const addTransitCargoAction = (data: cargoType) => ({
    type: ADD_TRANSIT_CARGO,
    payload: data,
});

export const removeTransitCargoAction = (data: transitCargoType) => ({
    type: REMOVE_TRANSIT_CARGO,
    payload: data,
});

export const editTransitCargoAction = (data: transitCargoType) => ({
    type: EDIT_TRANSIT_CARGO,
    payload: data,
});

export const completeCargoAction = (data: transitCargoType) => ({
    type: COMPLETE_TRANSIT_CARGO,
    payload: data,
});
