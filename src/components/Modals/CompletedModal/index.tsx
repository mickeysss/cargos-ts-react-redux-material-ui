import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
    completeCargoAction,
    editTransitCargoAction,
} from '../../../store/reducers/transits-reducer/action';
import {
    cargoType,
    commonCargosTypes,
} from '../../../store/reducers/cargos-reducer/types';

import { transitCargoType } from '../../../store/reducers/transits-reducer/types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';

import { buttonStyles } from '../../../pages/StatisticPage/components/ButtonStyles';
import { useFormik } from 'formik';
import { transitValidation } from '../../../helpers/validation';
import { AppRootStateType } from '../../../store/reducers';
import styles from '../styles.module.scss';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<React.SetStateAction<cargoType>>;
    setCompletedCargo: Dispatch<React.SetStateAction<transitCargoType>>;
    completedCargo: transitCargoType;
    setError: Dispatch<React.SetStateAction<string>>;
    type: string;
};

const CompletedModal = ({ type, open, setOpen, completedCargo }: Props) => {
    const commonCargos = useSelector<AppRootStateType, commonCargosTypes>(
        (state) => state.cargos
    );
    const { destinations } = commonCargos;

    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            position: completedCargo.position,
            category: completedCargo.category,
            destinationFrom: completedCargo.destinationFrom,
            destinationTo: completedCargo.destinationTo,
            quantity: completedCargo.quantity,
        },
        validationSchema: transitValidation,
        onSubmit: (values) => {
            switch (type) {
                case 'confirmation':
                    dispatch(
                        completeCargoAction({
                            id: completedCargo.id,
                            cargoNumber: completedCargo.cargoNumber,
                            category: values.category,
                            position: values.position,
                            destinationFrom: values.destinationFrom,
                            destinationTo: values.destinationTo,
                            quantity: values.quantity,
                            status: 'In transit',
                        })
                    );
                    onCloseCompletedHandler();
                    break;

                case 'editing':
                    dispatch(
                        editTransitCargoAction({
                            id: completedCargo.id,
                            cargoNumber: completedCargo.cargoNumber,
                            category: values.category,
                            position: values.position,
                            destinationFrom: values.destinationFrom,
                            destinationTo: values.destinationTo,
                            quantity: values.quantity,
                            status: 'In transit',
                            attention: '-',
                        })
                    );
                    onCloseCompletedHandler();
                    break;
            }
        },
    });

    const onCloseCompletedHandler = () => {
        setOpen(false);
    };

    return (
        <Modal
            onClose={onCloseCompletedHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={open}
        >
            <Box className={styles.box}>
                <h2 className={styles.inputField}>
                    {type === 'editing' && 'Edit transit'}
                    {type === 'confirmation' && 'Confirm cargo transit'}
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.inputField}>
                        <TextField
                            select
                            fullWidth
                            name="destinationFrom"
                            label="Destination From"
                            value={formik.values.destinationFrom}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.destinationFrom &&
                                Boolean(formik.errors.position)
                            }
                            helperText={
                                formik.touched.position &&
                                formik.errors.position
                            }
                            type="string"
                            disabled={type === 'confirmation' && true}
                        >
                            {destinations?.map((destination, i) => (
                                <MenuItem key={i} value={destination}>
                                    {destination}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className={styles.inputField}>
                        <TextField
                            select
                            fullWidth
                            id="destinationTo"
                            name="destinationTo"
                            label="Choose department To"
                            value={formik.values.destinationTo}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.destinationTo &&
                                Boolean(formik.errors.destinationTo)
                            }
                            helperText={
                                formik.touched.destinationTo &&
                                formik.errors.destinationTo
                            }
                            type="string"
                            disabled={type === 'confirmation' && true}
                        >
                            {destinations?.map((destination, i) => (
                                <MenuItem key={i} value={destination}>
                                    {destination}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className={styles.inputField}>
                        <TextField
                            fullWidth
                            id="position"
                            name="position"
                            label="Position"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.position &&
                                Boolean(formik.errors.position)
                            }
                            helperText={
                                formik.touched.position &&
                                formik.errors.position
                            }
                            type="string"
                            disabled={type === 'confirmation' && true}
                        />
                    </div>
                    <div className={styles.inputField}>
                        <TextField
                            fullWidth
                            id="category"
                            name="category"
                            label="Category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.category &&
                                Boolean(formik.errors.category)
                            }
                            helperText={
                                formik.touched.category &&
                                formik.errors.category
                            }
                            type="string"
                            disabled={type === 'confirmation' && true}
                        />
                    </div>
                    <div className={styles.inputField}>
                        <TextField
                            fullWidth
                            id="quantity"
                            name="quantity"
                            label="Choose quantity"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.quantity &&
                                Boolean(formik.errors.quantity)
                            }
                            helperText={
                                formik.touched.quantity &&
                                formik.errors.quantity
                            }
                            type="number"
                        />
                    </div>
                    <div className={styles.inputField}>
                        <Button
                            type={'submit'}
                            style={buttonStyles}
                            className={styles.button}
                            variant="outlined"
                        >
                            Confirm transit
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default CompletedModal;
