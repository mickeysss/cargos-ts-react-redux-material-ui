import {
    actionTypes,
    ADD_CARGO,
    commonCargosTypes,
    EDIT_CARGO,
    REMOVE_CARGO,
} from './types';

import uniqid from 'uniqid';

const initialState: commonCargosTypes = {
    cargos: [
        {
            id: 1,
            cargoNumber: uniqid(),
            position: 'Laptops',
            category: 'Electronic goods',
            status: 'In stock',
        },
        {
            id: 2,
            cargoNumber: uniqid(),
            position: 'Cars',
            category: 'Vehicle',
            status: 'In stock',
        },
        {
            id: 3,
            cargoNumber: uniqid(),
            position: 'Groats',
            category: 'Meal',
            status: 'In stock',
        },
        {
            id: 4,
            cargoNumber: uniqid(),
            position: 'Brand clothes',
            category: 'Wear',
            status: 'In stock',
        },
        {
            id: 5,
            cargoNumber: uniqid(),
            position: 'Lays',
            category: 'Meal',
            status: 'In stock',
        },
        {
            id: 6,
            cargoNumber: uniqid(),
            position: 'Cotton',
            category: 'Material',
            status: 'In stock',
        },
        {
            id: 7,
            cargoNumber: uniqid(),
            position: 'Quadrocopters',
            category: 'Electronic goods',
            status: 'In stock',
        },
        {
            id: 8,
            cargoNumber: uniqid(),
            position: 'Sugar',
            category: 'Meal',
            status: 'In stock',
        },
    ],
    destinations: ['Moscow', 'Rostov', 'Krasnodar'],
};

export const cargosReducer = (state = initialState, action: actionTypes) => {
    switch (action.type) {
        case ADD_CARGO:
            return { ...state, cargos: [...state.cargos, action.payload] };

        case REMOVE_CARGO:
            return {
                ...state,
                cargos: [
                    ...state.cargos.filter(
                        (cargo) => cargo.id !== action.payload.id
                    ),
                ],
            };
        case EDIT_CARGO:
            return {
                ...state,
                cargos: [
                    ...state.cargos.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, ...action.payload }
                            : item
                    ),
                ],
            };
        default:
            return state;
    }
};
