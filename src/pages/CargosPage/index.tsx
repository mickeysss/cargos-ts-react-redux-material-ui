import React, { Dispatch } from 'react';

import { AddCargo, AddTransit } from '../../components';

import Button from '@mui/material/Button';

import { cargoType } from '../../App';

import styles from './styles.module.scss';
import Table from '../../components/Table';
import { GridColumns, GridPreProcessEditCellProps } from '@mui/x-data-grid';

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

type Props = {
    cargos: cargoType[];
    setCargos: Dispatch<React.SetStateAction<cargoType[]>>;
    selectedCargo: cargoType;
    rowsInTransit: cargoType[];
    setSelectedCargo: Dispatch<React.SetStateAction<cargoType>>;
    setRowsInTransit: Dispatch<React.SetStateAction<cargoType[]>>;
    error: string;
    setError: Dispatch<React.SetStateAction<string>>;
};

const CargosPage = ({
    error,
    setError,
    cargos,
    setCargos,
    selectedCargo,
    setSelectedCargo,
    setRowsInTransit,
    rowsInTransit,
}: Props) => {
    const removeHandler = () => {
        if (
            !selectedCargo.category &&
            !selectedCargo.name &&
            !selectedCargo.quantity
        ) {
            setError('Please select item');
        } else {
            localStorage.setItem(
                'cargos',
                JSON.stringify(
                    cargos.filter((cargo) => cargo !== selectedCargo)
                )
            );
            setCargos(cargos.filter((cargo) => cargo !== selectedCargo));

            setSelectedCargo({
                category: '',
                id: 0,
                name: '',
                quantity: 0,
                status: '',
                destination: '',
            });
        }
    };

    return (
        <div className={styles.flexContainer}>
            <h2 className={styles.title}>Cargos</h2>
            <div className={styles.cargosList}>
                <Table
                    setError={setError}
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
                    setError={setError}
                    rowsInTransit={rowsInTransit}
                    setRowsInTransit={setRowsInTransit}
                    selectedCargo={selectedCargo}
                    setSelectedCargo={setSelectedCargo}
                />
            </div>
            {error && <div style={{ color: '#FFFFFF' }}>{error}</div>}
        </div>
    );
};

export default CargosPage;
