import {
    actionTypes,
    ADD_TRANSIT_CARGO,
    COMPLETE_TRANSIT_CARGO,
    EDIT_TRANSIT_CARGO,
    REMOVE_TRANSIT_CARGO,
    transitCargoType,
} from './types';

const initialState: transitCargoType[] = [];

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
