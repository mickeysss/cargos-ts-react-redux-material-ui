import { actionTypes, ADD_TRANSIT_CARGO, COMPLETE_TRANSIT_CARGO, transitCargoType } from './types';

const initialState: transitCargoType[] = [];

export const transitCargoReducer = (state = initialState, action: actionTypes) => {
    switch (action.type) {
        case ADD_TRANSIT_CARGO:
            return [...state, action.payload]
        case COMPLETE_TRANSIT_CARGO:
            return [...state.map(
                (item) => item.id === action.payload.id ?
                    item.quantity === action.payload.quantity ?
                    {
                        ...item,
                        status: 'Completed',
                        attention: 'No problem issued'
                    }
                    : {
                        ...item,
                        status: 'Partly completed',
                        attention: item.quantity - action.payload.quantity
                    }
                    : item
            )]
        default:
            return state;
    }
};
