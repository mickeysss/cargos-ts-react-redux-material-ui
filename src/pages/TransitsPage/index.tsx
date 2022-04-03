import React, { Dispatch, SetStateAction, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import CompletedModal from '../../components/Modals/CompletedModal';
import Table from '../../components/Table';

import { AppRootStateType } from '../../store/reducers';
import { transitCargoType } from '../../store/reducers/transits-reducer/types';
import { cargoType } from '../../store/reducers/cargos-reducer/types';

import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import styles from '../TransitsPage/styles.module.scss';
import { Delete, EditLocationAlt } from '@mui/icons-material';
import { removeTransitCargoAction } from '../../store/reducers/transits-reducer/action';
import { transitColumns } from '../../mocks/mocks';

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
    const [type, setType] = React.useState('');

    const transitCargo = useSelector<AppRootStateType, transitCargoType[]>(
        (state) => state.transitCargo
    );

    const [completedCargo, setCompletedCargo] = useState<transitCargoType>({
        category: '',
        id: 0,
        position: '',
        cargoNumber: '',
        quantity: 0,
        status: '',
        destinationFrom: '',
        destinationTo: '',
        attention: '',
    });

    const dispatch = useDispatch();

    const onOpenCompletedHandler = () => {
        if (completedCargo.id) {
            setType('confirmation');
            setOpen(true);
            setError('');
            setCompletedCargo({
                quantity: 0,
                destinationFrom: '',
                destinationTo: '',
                category: '',
                id: 0,
                cargoNumber: '',
                position: '',
                status: '',
            });
        } else {
            setError('Please select item');
        }
    };

    const removeHandler = () => {
        if (completedCargo.id) {
            dispatch(removeTransitCargoAction(completedCargo));
        } else {
            setError('Please select item');
        }
    };
    const changeHandler = () => {
        if (completedCargo.id) {
            setType('editing');
            setOpen(true);
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
                        rows={transitCargo}
                        selectedRow={completedCargo}
                        setSelectedRow={setCompletedCargo}
                        columns={transitColumns}
                        setError={setError}
                    />
                </div>
                <div className={styles.tableButtonContainer}>
                    <Button onClick={changeHandler}>
                        <EditLocationAlt />
                        <span>Change transit</span>
                    </Button>
                    <CompletedModal
                        type={type}
                        open={open}
                        setOpen={setOpen}
                        setError={setError}
                        selectedCargo={selectedCargo}
                        setSelectedCargo={setSelectedCargo}
                        completedCargo={completedCargo}
                        setCompletedCargo={setCompletedCargo}
                    />
                    <Button onClick={removeHandler}>
                        <Delete />
                        <span>Remove transit</span>
                    </Button>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.buttonContainer}>
                    <Button onClick={onOpenCompletedHandler}>
                        <CheckCircleIcon />
                        <div>Confirm transit</div>
                    </Button>
                    <CompletedModal
                        type={type}
                        open={open}
                        setOpen={setOpen}
                        setError={setError}
                        selectedCargo={selectedCargo}
                        setSelectedCargo={setSelectedCargo}
                        completedCargo={completedCargo}
                        setCompletedCargo={setCompletedCargo}
                    />
                </div>
            </div>
        </div>
    );
};

export default TransitsPage;
