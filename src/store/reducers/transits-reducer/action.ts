import { ADD_TRANSIT_CARGO, COMPLETE_TRANSIT_CARGO, transitCargoType } from './types';

export const addTransitCargoAction = (data: transitCargoType) => ({
    type: ADD_TRANSIT_CARGO,
    payload: data,
});

export const completeCargoAction = (data: transitCargoType) => ({
    type: COMPLETE_TRANSIT_CARGO,
    payload: data,
});