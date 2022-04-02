export type cargoType = {
    id: number;
    name: string;
    category: string;
    quantity: number;
    status: string;
    destination?: string;
    attention?: string | number;

};


export type addCargoType = {
    type: typeof ADD_CARGO
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


export type actionTypes = addCargoType | removeCargoType | editCargoType