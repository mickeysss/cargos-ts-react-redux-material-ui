import React, { Dispatch } from 'react';

import { CargoTable, AddCargo, AddTransit } from '../../components';

import { cargoType } from '../../App';

import styles from './styles.module.scss';
import Button from '@mui/material/Button';

type Props = {
    cargos: cargoType[];
    setCargos: Dispatch<React.SetStateAction<cargoType[]>>;
    selectedCargo: { [key: string]: any };
    rowsInTransit: { [key: string]: any }[];
    setSelectedCargo: Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    setRowsInTransit: Dispatch<React.SetStateAction<{ [key: string]: any }[]>>;
};

const CargosPage = ({
    cargos,
    setCargos,
    selectedCargo,
    setSelectedCargo,
    setRowsInTransit,
    rowsInTransit,
}: Props) => {
    const removeHandler = () => {
        setCargos(cargos.filter((cargo) => cargo !== selectedCargo));

        setSelectedCargo({
            category: '',
            id: 0,
            name: '',
            quantity: 0,
            status: '',
            destination: '',
        });
    };

    return (
        <div className={styles.flexContainer}>
            <h2 className={styles.title}>Current cargos</h2>
            <div className={styles.cargosList}>
                <CargoTable
                    setSelectedCargo={setSelectedCargo}
                    cargos={cargos}
                />
            </div>
            <div className={styles.buttonsContainer}>
                <AddCargo cargos={cargos} setCargos={setCargos} />

                <Button onClick={removeHandler}>Remove cargo</Button>

                <AddTransit
                    rowsInTransit={rowsInTransit}
                    setRowsInTransit={setRowsInTransit}
                    selectedCargo={selectedCargo}
                    setSelectedCargo={setSelectedCargo}
                />
            </div>
        </div>
    );
};

export default CargosPage;
