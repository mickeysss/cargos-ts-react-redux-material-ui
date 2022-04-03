import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

import { useDispatch } from 'react-redux';

import uniqid from 'uniqid';

import { addCargoAction } from '../../../store/reducers/cargos-reducer/actions';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input, InputLabel } from '@mui/material';
import { buttonStyles } from '../../../pages/StatisticPage/components/ButtonStyles';

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
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddCargoModal = ({ open, setOpen }: Props) => {
    const [newCargo, setNewCargo] = useState({
        id: 0,
        position: '',
        category: '',
        status: 'In stock',
        cargoNumber: '',
    });

    const dispatch = useDispatch();

    const changeCargoHandler = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setNewCargo({
            ...newCargo,
            id: Date.now(),
            cargoNumber: uniqid(),
            [name]: value,
        });
    };

    const addCargoHandler = () => {
        if (newCargo.id) {
            dispatch(addCargoAction(newCargo));
            setOpen(false);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <InputLabel htmlFor="position">
                        Add cargo position
                    </InputLabel>
                    <Input
                        name="position"
                        type="string"
                        onChange={(e) => changeCargoHandler(e)}
                    />
                    <InputLabel htmlFor="category">
                        Category of cargo
                    </InputLabel>
                    <Input
                        name="category"
                        type="string"
                        onChange={(e) => changeCargoHandler(e)}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <Button
                            style={buttonStyles}
                            onClick={addCargoHandler}
                            variant="outlined"
                        >
                            Add cargo
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddCargoModal;
