import {
    actionTypes,
    ADD_TRANSIT_CARGO,
    COMPLETE_TRANSIT_CARGO,
    EDIT_TRANSIT_CARGO,
    REMOVE_TRANSIT_CARGO,
    transitCargoType,
} from './types';

const initialState: transitCargoType[] = [
    {
        attention: '-',
        cargoNumber: 'l1k7tzyh',
        category: 'Vehicle',
        destinationFrom: 'Moscow',
        destinationTo: 'Krasnodar',
        id: 1649049147660,
        position: 'Cars',
        quantity: 50,
        status: 'In Transit',
    },
    {
        attention: '-',
        cargoNumber: 'z1k7tzy',
        category: 'Material',
        destinationFrom: 'Rostov',
        destinationTo: 'Moscow',
        id: 1649049147661,
        position: 'Cotton',
        quantity: 500,
        status: 'In Transit',
    },
    {
        attention: '-',
        cargoNumber: 'y1k7tzy',
        category: 'Meal',
        destinationFrom: 'Krasnodar',
        destinationTo: 'Moscow',
        id: 1649049147663,
        position: 'Lays',
        quantity: 300,
        status: 'Completed',
    },
    {
        attention: '-',
        cargoNumber: 'y3k7tzy',
        category: 'Meal',
        destinationFrom: 'Rostov',
        destinationTo: 'Moscow',
        id: 1649049147664,
        position: 'Bananas',
        quantity: 300,
        status: 'Completed',
    },
];

export const transitCargoReducer = (
    state = initialState,
    action: actionTypes
) => {
    switch (action.type) {
        case ADD_TRANSIT_CARGO:
            return [...state, action.payload];

        case REMOVE_TRANSIT_CARGO:
            return [...state.filter((cargo) => cargo.id !== action.payload.id)];

        case EDIT_TRANSIT_CARGO:
            return [
                ...state.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            ];

        case COMPLETE_TRANSIT_CARGO:
            return [
                ...state.map((item) =>
                    item.id === action.payload.id
                        ? item.quantity === action.payload.quantity
                            ? {
                                  ...item,
                                  status: 'Completed',
                                  attention: 'No problem issued',
                              }
                            : {
                                  ...item,
                                  status: 'Partially completed',
                                  attention: `Not enough : ${
                                      item.quantity - action.payload.quantity
                                  }`,
                              }
                        : item
                ),
            ];
        default:
            return state;
    }
};
