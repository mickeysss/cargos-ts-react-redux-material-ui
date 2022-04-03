import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';

import { editCargoAction } from '../../../store/reducers/cargos-reducer/actions';

import { cargoValidation } from '../../../helpers/validation';

import { cargoType } from '../../../store/reducers/cargos-reducer/types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

import { buttonStyles } from '../../../pages/StatisticPage/components/ButtonStyles';

import styles from '../AddCargoModal/styles.module.scss';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<SetStateAction<cargoType>>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    editHandler: Dispatch<SetStateAction<cargoType>>;
};

const EditModal = ({ open, setOpen, selectedCargo }: Props) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            position: selectedCargo.position,
            category: selectedCargo.category,
        },
        validationSchema: cargoValidation,
        onSubmit: (values) => {
            dispatch(
                editCargoAction({
                    id: selectedCargo.id,
                    cargoNumber: selectedCargo.cargoNumber,
                    category: values.category,
                    position: values.position,
                    status: 'In Stock',
                })
            );
            setOpen(false);
        },
    });

    const dispatch = useDispatch();

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className={styles.modalTitle}>Edit selected cargo</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.inputField}>
                            <TextField
                                label="Cargo Number"
                                className={styles.inputField}
                                fullWidth
                                name="cargoNumber"
                                type="string"
                                defaultValue={selectedCargo.cargoNumber}
                                disabled={true}
                            />
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
                            />
                        </div>
                        <div className={styles.inputField}>
                            <Button
                                type="submit"
                                style={buttonStyles}
                                variant="outlined"
                            >
                                Edit Cargo
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default EditModal;
