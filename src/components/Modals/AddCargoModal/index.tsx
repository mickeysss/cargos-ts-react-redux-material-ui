import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';

import uniqid from 'uniqid';

import { cargoValidation } from '../../../helpers/validation';

import { addCargoAction } from '../../../store/reducers/cargos-reducer/actions';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

import { boxStyles } from '../../../pages/StatisticPage/components/Styles/boxStyles';
import { buttonStyles } from '../../../pages/StatisticPage/components/Styles/ButtonStyles';
import styles from './styles.module.scss';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddCargoModal = ({ open, setOpen }: Props) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            position: '',
            category: '',
        },
        validationSchema: cargoValidation,
        onSubmit: (values) => {
            dispatch(
                addCargoAction({
                    id: Date.now(),
                    category: values.category,
                    position: values.position,
                    status: 'In Stock',
                    cargoNumber: uniqid(),
                })
            );
            setOpen(false);
        },
    });

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyles}>
                    <h2 className={styles.modalTitle}>Add new cargo</h2>
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
                                Add cargo
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default AddCargoModal;
