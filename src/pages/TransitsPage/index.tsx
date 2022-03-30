import React, { Dispatch, SetStateAction, useState } from 'react';

import TransitTable from '../../components/Tables/TransitTable';
import AddCompleted from '../../components/Modals/AddCompleted';

import styles from '../CargosPage/styles.module.scss';
import { cargoType } from '../../App';

type Props = {
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<SetStateAction<cargoType>>;
    rowsInTransit: cargoType[];
    setRowsInTransit: Dispatch<SetStateAction<cargoType[]>>;
};

const TransitsPage = ({ selectedCargo, setSelectedCargo, rowsInTransit,setRowsInTransit }: Props) => {
    const [completedCargo,setCompletedCargo] = useState<cargoType>(selectedCargo);

    return (
        <div className={styles.flexContainer}>
            <h2 className={styles.title}>All transits</h2>
            <div className={styles.cargosList}>
                <TransitTable
                    setCompletedCargo={setCompletedCargo}
                    selectedCargo={selectedCargo}
                    rowsInTransit={rowsInTransit}
                />
            </div>
            <AddCompleted rowsInTransit={rowsInTransit}
                          setRowsInTransit={setRowsInTransit}
                          selectedCargo={selectedCargo}
                          setSelectedCargo={setSelectedCargo}
                          completedCargo={completedCargo}
                          setCompletedCargo={setCompletedCargo}
            />
        </div>
    );
};

export default TransitsPage;
