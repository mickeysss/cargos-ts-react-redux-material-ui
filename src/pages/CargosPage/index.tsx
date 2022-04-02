import React, { Dispatch } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { removeCargoAction } from '../../store/reducers/cargos-reducer/actions';
import { AppRootStateType } from '../../store/reducers';
import {
    cargoType,
    commonCargosTypes,
} from '../../store/reducers/cargos-reducer/types';

import Table from '../../components/Table';
import TransitModal from '../../components/Modals/TransitModal';
import CargoModal from '../../components/Modals/CargoModal';

import Button from '@mui/material/Button';
import { GridColumns, GridPreProcessEditCellProps } from '@mui/x-data-grid';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AddLocation, Delete, EditLocationAlt } from '@mui/icons-material';

import styles from './styles.module.scss';

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
    const [openCargo, setOpenCargo] = React.useState(false);
    const [openTransit, setOpenTransit] = React.useState(false);

    const commonCargos = useSelector<AppRootStateType, commonCargosTypes>(
        (state) => state.cargos
    );
    const { cargos } = commonCargos;

    const dispatch = useDispatch();

    const onOpenModalHandler = () => {
        selectedCargo.id && setOpenTransit(true);
    };

    const removeHandler = () => {
        dispatch(removeCargoAction(selectedCargo));

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
        <div className={styles.main}>
            <div className={styles.heroBg} />
            <div className={styles.flexContainer}>
                <h2 className={styles.headerTitle}>Cargos</h2>
                <div className={styles.cargosList}>
                    <Table
                        rows={cargos}
                        selectedRow={selectedCargo}
                        setSelectedRow={setSelectedCargo}
                        columns={columns}
                        setError={setError}
                    />
                </div>
                <div className={styles.tableButtonContainer}>
                    <Button onClick={() => setOpenCargo(true)}>
                        <AddBoxIcon />
                        <div>Add cargo</div>
                    </Button>
                    <CargoModal open={openCargo} setOpen={setOpenCargo} />
                    <Button>
                        <EditLocationAlt />
                        <span>Edit cargo</span>
                    </Button>
                    <Button onClick={removeHandler}>
                        <Delete />
                        <span>Remove cargo</span>
                    </Button>
                </div>

                <div className={styles.buttonContainer}>
                    <Button
                        className={styles.button}
                        onClick={onOpenModalHandler}
                    >
                        <AddLocation />
                        <div>Add transit</div>
                    </Button>
                    <TransitModal
                        open={openTransit}
                        setOpen={setOpenTransit}
                        setError={setError}
                        selectedCargo={selectedCargo}
                        setSelectedCargo={setSelectedCargo}
                    />
                </div>
                {error && <div style={{ color: '#FFFFFF' }}>{error}</div>}
            </div>
        </div>
    );
};

export default CargosPage;
