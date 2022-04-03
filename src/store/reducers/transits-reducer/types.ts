export type transitCargoType = {
    id: number;
    position: string;
    cargoNumber: string;
    category: string;
    quantity: number;
    status: string;
    destinationFrom?: string;
    destinationTo?: string;
    destination?: string;
    attention?: string | number;
};

export type addTransitCargoType = {
    type: typeof ADD_TRANSIT_CARGO;
    payload: transitCargoType;
};

export type completeTransitCargoType = {
    type: typeof COMPLETE_TRANSIT_CARGO;
    payload: transitCargoType;
};

export const ADD_TRANSIT_CARGO = 'ADD_TRANSIT_CARGO';
export const COMPLETE_TRANSIT_CARGO = 'COMPLETE_TRANSIT_CARGO';

export type actionTypes = addTransitCargoType | completeTransitCargoType;
