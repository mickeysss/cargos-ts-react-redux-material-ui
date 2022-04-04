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
import CargoModal from '../../components/Modals/AddCargoModal';
import EditModal from '../../components/Modals/EditModal';

import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { AddLocation, Delete, EditLocationAlt } from '@mui/icons-material';

import { cargoColumns } from '../../mocks/mocks';

import styles from './styles.module.scss';

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
    const [openEdit, setOpenEdit] = React.useState(false);

    const commonCargos = useSelector<AppRootStateType, commonCargosTypes>(
        (state) => state.cargos
    );
    const { cargos } = commonCargos;

    const dispatch = useDispatch();

    const onOpenModalHandler = () => {
        if (selectedCargo.id) {
            setOpenTransit(true);
            setError('');
        } else {
            setError('Please select item');
            setSelectedCargo({ ...selectedCargo, id: 0 });
        }
    };

    const addHandler = () => {
        setOpenCargo(true);
    };

    const removeHandler = () => {
        if (selectedCargo.id) {
            setError('');
            dispatch(removeCargoAction(selectedCargo));
            setSelectedCargo({
                category: '',
                id: 0,
                cargoNumber: '',
                position: '',
                status: '',
            });
        } else {
            setError('Please select Item');
        }
    };

    const editHandler = () => {
        if (selectedCargo.id) {
            setOpenEdit(true);
        } else {
            setError('Please select Item');
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.heroBg} />
            <div className={styles.flexContainer}>
                <div className={styles.headerContainer}>
                    <h2 className={styles.headerTitle}>Cargos</h2>
                    <div className={styles.headerItem}>
                        <Button onClick={addHandler}>
                            <div className={styles.buttonName}>Add cargo</div>
                            <AddBoxIcon className={styles.addIcon} />
                        </Button>
                        <CargoModal open={openCargo} setOpen={setOpenCargo} />
                    </div>
                </div>
                <div className={styles.cargosList}>
                    <Table
                        rows={cargos}
                        selectedRow={selectedCargo}
                        setSelectedRow={setSelectedCargo}
                        columns={cargoColumns}
                        setError={setError}
                    />
                </div>
                <div className={styles.footerContainer}>
                    <div className={styles.tableButtonContainer}>
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
                    </div>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.buttonContainer}>
                    <Button
                        className={styles.button}
                        onClick={onOpenModalHandler}
                    >
                        <AddLocation className={styles.transitIcon} />
                        <div>Add transit</div>
                    </Button>
                    <TransitModal
                        selectedCargo={selectedCargo}
                        open={openTransit}
                        setOpen={setOpenTransit}
                        setError={setError}
                        setSelectedCargo={setSelectedCargo}
                    />
                </div>
            </div>
        </div>
    );
};

export default CargosPage;
