import React, { Dispatch } from 'react';

import { AddCargo, AddTransit } from '../../components';

import Button from '@mui/material/Button';

import { cargoType } from '../../App';

import styles from './styles.module.scss';
import Table from '../../components/Table';
import { GridColumns, GridPreProcessEditCellProps } from '@mui/x-data-grid';

type Props = {
    cargos: cargoType[];
    setCargos: Dispatch<React.SetStateAction<cargoType[]>>;
    selectedCargo: cargoType;
    rowsInTransit: cargoType[];
    setSelectedCargo: Dispatch<React.SetStateAction<cargoType>>;
    setRowsInTransit: Dispatch<React.SetStateAction<cargoType[]>>;
};

const columns: GridColumns = [
    {
        field: 'status',
        headerName: 'Status',
        width: 300,
        type: 'string',
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'name',
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            const hasError = params.props.value.length < 3;
            return { ...params.props, error: hasError };
        },
        headerName: 'Name',
        width: 300,
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'category',
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            const hasError = params.props.value.length < 3;
            return { ...params.props, error: hasError };
        },
        headerName: 'Category',
        width: 300,
        type: 'string',
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'quantity',
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            const hasError = params.props.value < 0;
            return { ...params.props, error: hasError };
        },
        headerName: 'Quantity',
        width: 300,
        type: 'number',
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
];

const CargosPage = ({
    cargos,
    setCargos,
    selectedCargo,
    setSelectedCargo,
    setRowsInTransit,
    rowsInTransit,
}: Props) => {
    const removeHandler = () => {

        localStorage.setItem('cargos', JSON.stringify(cargos.filter((cargo) => cargo !== selectedCargo)))

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
            <h2 className={styles.title}>Cargos</h2>
            <div className={styles.cargosList}>
                <Table
                    selectedRow={selectedCargo}
                    rows={cargos}
                    setSelectedRow={setSelectedCargo}
                    columns={columns}
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
