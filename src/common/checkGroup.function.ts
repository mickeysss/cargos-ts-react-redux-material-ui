import { cargoType } from '../store/reducers/cargos-reducer/types';

export type ObjType = {
    category?: string;
    amount: number;
    position?: string;
};

export const checkGroup = (someArr: cargoType[]): ObjType[] => {
    const res: any = {};
    someArr.forEach((obj) => {
        res[obj.category] = +(res[obj.category] || 0) + 1;
    });
    return Object.entries(res).map((e: string & any) => ({
        category: e[0],
        amount: +e[1],
    }));
};
