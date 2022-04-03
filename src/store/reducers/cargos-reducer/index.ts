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
            position: 'Konfetti',
            category: 'Meal',
            status: 'In stock',
        },
        {
            id: 2,
            cargoNumber: uniqid(),
            position: 'Banani',
            category: 'Meal',
            status: 'In stock',
        },
        {
            id: 3,
            cargoNumber: uniqid(),
            position: 'Macbooks',
            category: 'Meal',
            status: 'In stock',
        },
        {
            id: 4,
            cargoNumber: uniqid(),
            position: 'T-shirts',
            category: 'Menswear',
            status: 'In stock',
        },
        {
            id: 5,
            cargoNumber: uniqid(),
            position: 'Bruce Willis',
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
