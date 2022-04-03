export type cargoType = {
    id: number;
    position: string;
    category: string;
    status: string;
    cargoNumber: string;
    destinationFrom?: string;
    destinationTo?: string;
    destination?: string;
    attention?: string | number;
    quantity?: 0;
};

export type commonCargosTypes = {
    cargos: cargoType[];
    destinations?: string[];
};

export type addCargoType = {
    type: typeof ADD_CARGO;
    payload: cargoType;
};

export type removeCargoType = {
    type: typeof REMOVE_CARGO;
    payload: cargoType;
};

export type editCargoType = {
    type: typeof EDIT_CARGO;
    payload: cargoType;
};

export const ADD_CARGO = 'ADD_CARGO';
export const REMOVE_CARGO = 'REMOVE_CARGO';
export const EDIT_CARGO = 'EDIT_CARGO';

export type actionTypes = addCargoType | removeCargoType | editCargoType;
