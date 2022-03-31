import React, { Dispatch, SetStateAction, useState } from 'react';

import AddCompleted from '../../components/Modals/AddCompleted';

import { cargoType } from '../../App';
import Table from '../../components/Table';
import { GridColumns, GridPreProcessEditCellProps } from '@mui/x-data-grid';

import styles from '../CargosPage/styles.module.scss';

const columns: GridColumns = [
    {
        field: 'status',
        headerName: 'Status',
        width: 200,
        type: 'string',
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'destination',
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            const hasError = params.props.value.length < 3;
            return { ...params.props, error: hasError };
        },
        headerName: 'Destination',
        width: 200,
        editable: true,
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
        width: 200,
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
        width: 200,
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
        width: 200,
        type: 'number',
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
];

type Props = {
    setRows: Dispatch<SetStateAction<cargoType[]>>;
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<SetStateAction<cargoType>>;
    rowsInTransit: cargoType[];
    setRowsInTransit: Dispatch<SetStateAction<cargoType[]>>;
};

const TransitsPage = ({
    selectedCargo,
    setSelectedCargo,
    rowsInTransit,
    setRowsInTransit,
}: Props) => {
    const [completedCargo, setCompletedCargo] = useState<cargoType>({
        category: '',
        id: 0,
        name: '',
        quantity: 0,
        status: '',
        destination: '',
    });
    console.log(rowsInTransit);
    return (
        <div className={styles.flexContainer}>
            <h2 className={styles.title}>All transits</h2>
            <div className={styles.cargosList}>
                <Table
                    selectedRow={selectedCargo}
                    rows={rowsInTransit}
                    setSelectedRow={setCompletedCargo}
                    columns={columns}
                />
            </div>
            <AddCompleted
                rowsInTransit={rowsInTransit}
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
