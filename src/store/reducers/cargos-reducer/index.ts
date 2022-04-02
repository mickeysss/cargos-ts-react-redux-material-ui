import { actionTypes, cargoType, ADD_CARGO, REMOVE_CARGO, EDIT_CARGO } from './types';

const initialState: cargoType[] = [
    {
        id: 1,
        name: 'Konfetti',
        quantity: 1000,
        category: 'Meal',
        status: 'In stock',
    },
    {
        id: 2,
        name: 'Banani',
        quantity: 5000,
        category: 'Meal',
        status: 'In stock',
    },
    {
        id: 3,
        name: 'Macbooks',
        quantity: 1000,
        category: 'Meal',
        status: 'In stock',
    },
    {
        id: 4,
        name: 'Liam Nison',
        quantity: 1000,
        category: 'Meal',
        status: 'In stock',
    },
    {
        id: 5,
        name: 'Bruce Willis',
        quantity: 1000,
        category: 'Meal',
        status: 'In stock',
    },
];

export const cargosReducer = (state = initialState, action: actionTypes) => {
    switch (action.type) {
        case ADD_CARGO:
            return [...state, action.payload]

        case REMOVE_CARGO:
            return state.filter(todo => todo.id !== action.payload.id);
        case EDIT_CARGO:
            return [...state.map(
            (item) => item.id === action.payload.id ?
                    {
                        ...item,
                        quantity: item.quantity - action.payload.quantity
                    }
                    : item
            )]

        default:
            return state;
    }
};
