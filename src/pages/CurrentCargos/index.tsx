import React, { Dispatch } from 'react';

import { TableComponent, ModalComponent } from '../../components';

import { cargoType } from '../../App';

import styles from './styles.module.scss';

type Props = {
    cargos: cargoType[];
    setCargos: Dispatch<React.SetStateAction<cargoType[]>>;
};

const CurrentCargos = ({ cargos, setCargos }: Props) => {
    return (
        <div className={styles.flexContainer}>
            <h2 className={styles.title}>Current cargos</h2>
            <div className={styles.cargosList}>
                <TableComponent cargos={cargos} />
            </div>
            <ModalComponent cargos={cargos} setCargos={setCargos} />
        </div>
    );
};

export default CurrentCargos;
