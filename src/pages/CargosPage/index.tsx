import React, { Dispatch, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { removeCargoAction } from '../../store/reducers/cargos-reducer/actions';
import { AppRootStateType } from '../../store/reducers';
import {
    cargoType,
    commonCargosTypes,
} from '../../store/reducers/cargos-reducer/types';

import Table from '../../components/Table';
import TransitModal from '../../components/Modals/TransitModal';
import CargoModal from '../../components/Modals/AddCargoModal';
import EditModal from '../../components/Modals/EditModal';

import Button from '@mui/material/Button';
import { GridColumns } from '@mui/x-data-grid';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AddLocation, Delete, EditLocationAlt } from '@mui/icons-material';

import styles from './styles.module.scss';

const columns: GridColumns = [
    {
        field: 'cargoNumber',
        headerName: 'Cargo number',
        width: 270,
        type: 'number',
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 270,
        type: 'string',
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'position',
        headerName: 'Position',
        width: 270,
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 270,
        type: 'string',
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
    const [errorTransit, setErrorTransit] = useState<string>('');
    const [openCargo, setOpenCargo] = React.useState(false);
    const [openTransit, setOpenTransit] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);

    const commonCargos = useSelector<AppRootStateType, commonCargosTypes>(
        (state) => state.cargos
    );
    const { cargos } = commonCargos;

    const dispatch = useDispatch();

    const onOpenModalHandler = () => {
        if (selectedCargo.id) {
            setOpenTransit(true);
        } else {
            setError('');
            setErrorTransit('Please select item');
            setSelectedCargo({ ...selectedCargo, id: 0 });
        }
    };

    const addHandler = () => {
        setOpenCargo(true);
    };
    const removeHandler = () => {
        if (selectedCargo.id) {
            dispatch(removeCargoAction(selectedCargo));
            setSelectedCargo({
                category: '',
                id: 0,
                quantity: 0,
                cargoNumber: '',
                position: '',
                status: '',
            });
        } else {
            setError('Please select item');
            setErrorTransit('');
        }
    };

    const editHandler = () => {
        if (selectedCargo.id) {
            setOpenEdit(true);
        }
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
                        setErrorTransit={setErrorTransit}
                    />
                </div>
                <div className={styles.tableButtonContainer}>
                    <Button onClick={addHandler}>
                        <AddBoxIcon />
                        <div>Add cargo</div>
                    </Button>
                    <CargoModal open={openCargo} setOpen={setOpenCargo} />
                    <Button onClick={editHandler}>
                        <EditLocationAlt />
                        <span>Edit cargo</span>
                    </Button>
                    <EditModal
                        selectedCargo={selectedCargo}
                        setSelectedCargo={setSelectedCargo}
                        open={openEdit}
                        setOpen={setOpenEdit}
                        editHandler={editHandler}
                    />
                    <Button onClick={removeHandler}>
                        <Delete />
                        <span>Remove cargo</span>
                    </Button>
                    {error && <div style={styles.error}>{error}</div>}
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
                        selectedCargo={selectedCargo}
                        open={openTransit}
                        setOpen={setOpenTransit}
                        setError={setError}
                        setSelectedCargo={setSelectedCargo}
                    />
                    {errorTransit && (
                        <div style={{ color: '#FFFFFF' }}>{errorTransit}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CargosPage;
