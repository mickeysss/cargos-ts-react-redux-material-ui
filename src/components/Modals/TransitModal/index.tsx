import * as React from 'react';
import { Dispatch } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';

import { AppRootStateType } from '../../../store/reducers';
import { addTransitCargoAction } from '../../../store/reducers/transits-reducer/action';
import {
    cargoType,
    commonCargosTypes,
} from '../../../store/reducers/cargos-reducer/types';
import { buttonStyles } from '../../../pages/StatisticPage/components/ButtonStyles';
import { useFormik } from 'formik';
import { transitValidation } from '../../../helpers/validation';
import styles from '../styles.module.scss';

type Props = {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<React.SetStateAction<cargoType>>;
    setError: Dispatch<React.SetStateAction<string>>;
};

const TransitModal = ({ selectedCargo, open, setOpen }: Props) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            position: selectedCargo.position,
            category: selectedCargo.category,
            destinationFrom: '',
            destinationTo: '',
            quantity: 0,
        },
        validationSchema: transitValidation,

        onSubmit: (values) => {
            dispatch(
                addTransitCargoAction({
                    id: Date.now(),
                    category: values.category,
                    position: values.position,
                    destinationFrom: values.destinationFrom,
                    destinationTo: values.destinationTo,
                    status: 'In Transit',
                    attention: '-',
                    cargoNumber: selectedCargo.cargoNumber,
                    quantity: values.quantity,
                })
            );
            setOpen(false);
        },
    });

    const commonCargos = useSelector<AppRootStateType, commonCargosTypes>(
        (state) => state.cargos
    );

    const { destinations } = commonCargos;

    const dispatch = useDispatch();

    const onCloseModalHandler = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                onClose={() => onCloseModalHandler()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={open}
            >
                <Box className={styles.box}>
                    <h2 className={styles.modalTitle}>Add new transit</h2>
                    <form onSubmit={formik.handleSubmit}>
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
                                disabled
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
                                disabled
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
                            <TextField
                                select
                                fullWidth
                                id="destinationFrom"
                                name="destinationFrom"
                                label="Choose department From"
                                value={formik.values.destinationFrom}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.destinationFrom &&
                                    Boolean(formik.errors.destinationFrom)
                                }
                                helperText={
                                    formik.touched.destinationFrom &&
                                    formik.errors.destinationFrom
                                }
                                type="string"
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
                            >
                                {destinations?.map((destination, i) => (
                                    <MenuItem key={i} value={destination}>
                                        {destination}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div className={styles.inputField}>
                            <Button
                                type="submit"
                                style={buttonStyles}
                                variant="outlined"
                            >
                                Add transit
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default TransitModal;
