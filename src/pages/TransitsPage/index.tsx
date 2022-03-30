import React, { Dispatch, SetStateAction } from 'react';

import TransitTable from '../../components/Tables/TransitTable';

import styles from '../CargosPage/styles.module.scss';
import { cargoType } from '../../App';

type Props = {
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<SetStateAction<cargoType>>;
    rowsInTransit: cargoType[];
    setRowsInTransit: Dispatch<SetStateAction<cargoType[]>>;
};

const TransitsPage = ({ selectedCargo, rowsInTransit }: Props) => {
    return (
        <div className={styles.flexContainer}>
            <h2 className={styles.title}>All transits</h2>
            <div className={styles.cargosList}>
                <TransitTable
                    selectedCargo={selectedCargo}
                    rowsInTransit={rowsInTransit}
                />
            </div>
        </div>
    );
};

export default TransitsPage;
