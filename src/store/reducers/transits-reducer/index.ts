export type cargoType = {
    id: number;
    name: string;
    category: string;
    quantity: number;
    status: string;
    destination?: string;
    attention?: string;
};

const initialState: cargoType[] = [
    {
        id: 1,
        name: 'Burgers buns',
        quantity: 1000,
        category: 'Meal',
        status: 'In stock',
        attention: '0',
    },
    {
        id: 2,
        name: 'Oranges',
        quantity: 5000,
        category: 'Meal',
        status: 'In stock',
        attention: '0',
    },
    {
        id: 3,
        name: 'Burgers buns',
        quantity: 1000,
        category: 'Meal',
        status: 'In stock',
        attention: '0',
    },
    {
        id: 4,
        name: 'Burgers buns',
        quantity: 1000,
        category: 'Meal',
        status: 'In stock',
        attention: '0',
    },
    {
        id: 5,
        name: 'Burgers buns',
        quantity: 1000,
        category: 'Meal',
        status: 'In stock',
        attention: '0',
    },
];

export const cargosReducer = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            return state;
    }
};
