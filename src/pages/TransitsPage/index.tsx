import React, { Dispatch } from 'react';

import TransitTable from '../../components/TransitTable';

import styles from '../CargosPage/styles.module.scss';

type Props = {
    selectedCargo: { [key: string]: any };
    setSelectedCargo: Dispatch<{ [key: string]: any }>;
    rowsInTransit: { [key: string]: any }[];
    setRowsInTransit: Dispatch<{ [key: string]: any }[]>;
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
