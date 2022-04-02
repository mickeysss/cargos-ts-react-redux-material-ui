import { ADD_CARGO, REMOVE_CARGO,EDIT_CARGO, cargoType } from './types';

export const addCargoAction = (data: cargoType) => ({
    type: ADD_CARGO,
    payload: data,
});

export const removeCargoAction = (data: cargoType) => ({
    type: REMOVE_CARGO,
    payload: data,
});

export const editCargoAction = (data: cargoType) => ({
    type: EDIT_CARGO,
    payload: data,
});
