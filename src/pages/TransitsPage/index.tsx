import React, { Dispatch, SetStateAction, useState } from 'react';

import { useSelector } from 'react-redux';

import CompletedModal from '../../components/Modals/CompletedModal';
import Table from '../../components/Table';

import { AppRootStateType } from '../../store/reducers';
import { transitCargoType } from '../../store/reducers/transits-reducer/types';
import { cargoType } from '../../store/reducers/cargos-reducer/types';

import { GridColumns, GridPreProcessEditCellProps } from '@mui/x-data-grid';

import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import styles from '../TransitsPage/styles.module.scss';

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
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'attention',
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            const hasError = params.props.value < 0;
            return { ...params.props, error: hasError };
        },
        headerName: 'Attention',
        width: 200,
        type: 'number',
        align: 'left',
        headerAlign: 'left',
    },
];

type Props = {
    error: string;
    setError: Dispatch<React.SetStateAction<string>>;
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<SetStateAction<cargoType>>;
};

const TransitsPage = ({
    error,
    setError,
    selectedCargo,
    setSelectedCargo,
}: Props) => {
    const [open, setOpen] = React.useState(false);

    const transitCargo = useSelector<AppRootStateType, transitCargoType[]>(
        (state) => state.transitCargo
    );

    const [completedCargo, setCompletedCargo] = useState<cargoType>({
        category: '',
        id: 0,
        name: '',
        quantity: 0,
        status: '',
        destination: '',
        attention: '',
    });

    const onOpenCompletedHandler = () => {
        if (completedCargo.id) {
            setOpen(true);
            setError('');
        } else {
            setError('Please select item');
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.heroBg} />
            <div className={styles.flexContainer}>
                <h2 className={styles.title}>All transits</h2>
                <div className={styles.cargosList}>
                    <Table
                        setError={setError}
                        rows={transitCargo}
                        selectedRow={completedCargo}
                        setSelectedRow={setCompletedCargo}
                        columns={columns}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button onClick={onOpenCompletedHandler}>
                        <CheckCircleIcon />
                        <div>Confirm transit</div>
                    </Button>
                    <CompletedModal
                        open={open}
                        setOpen={setOpen}
                        setError={setError}
                        selectedCargo={selectedCargo}
                        setSelectedCargo={setSelectedCargo}
                        completedCargo={completedCargo}
                        setCompletedCargo={setCompletedCargo}
                    />
                </div>

                {error && <div style={{ color: '#FFFFFF' }}>{error}</div>}
            </div>
        </div>
    );
};

export default TransitsPage;
