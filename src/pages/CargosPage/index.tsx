import React, { Dispatch } from 'react';

import { AddCargo, AddTransit } from '../../components';

import Button from '@mui/material/Button';

import styles from './styles.module.scss';
import Table from '../../components/Table';
import { GridColumns, GridPreProcessEditCellProps } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/reducers';
import { removeCargoAction } from '../../store/reducers/cargos-reducer/actions';
import { cargoType } from '../../store/reducers/cargos-reducer/types';

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
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<React.SetStateAction<cargoType>>;
    error: string;
    setError: Dispatch<React.SetStateAction<string>>;
};

const CargosPage = ({
    error,
    setError,
    selectedCargo,
    setSelectedCargo,
}: Props) => {
    const cargos = useSelector<AppRootStateType, cargoType[]>(state => state.cargos)

    const dispatch = useDispatch()

    const removeHandler = () => {
        dispatch(removeCargoAction(selectedCargo))

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
                    rows={cargos}
                    selectedRow={selectedCargo}
                    setSelectedRow={setSelectedCargo}
                    columns={columns}
                    setError={setError}/>
            </div>
            <div className={styles.buttonsContainer}>
                <AddCargo />

                <Button onClick={removeHandler}>Remove cargo</Button>

                <AddTransit
                    setError={setError}
                    selectedCargo={selectedCargo}
                    setSelectedCargo={setSelectedCargo}
                />
            </div>

            {error && <div style={{ color: '#FFFFFF' }}>{error}</div>}
        </div>
    );
};

export default CargosPage;
