import * as React from 'react';
import { Dispatch, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { cargoType } from '../../../App';

import { Input, InputLabel } from '@mui/material';

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
    cargos: cargoType[];
    setCargos: Dispatch<React.SetStateAction<cargoType[]>>;
};

const AddCargo = ({ cargos, setCargos }: Props) => {
    const [open, setOpen] = React.useState(false);

    const [newCargo, setNewCargo] = useState({
        id: 0,
        name: '',
        category: '',
        quantity: 0,
        status: 'In stock',
    });

    const changeCargoHandler = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setNewCargo({ ...newCargo, id: Date.now(), [name]: value });
    };

    const addCargoHandler = () => {
        if (newCargo.category && newCargo.name && newCargo.quantity) {
            setCargos([...cargos, newCargo]);
            setOpen(false);
        } else return;
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Add new cargo</Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <InputLabel htmlFor="name">Add name of cargo</InputLabel>
                    <Input
                        name="name"
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
                    <InputLabel htmlFor="quantity">Quantity</InputLabel>
                    <Input
                        name="quantity"
                        type="number"
                        onChange={(e) => changeCargoHandler(e)}
                    />
                    <div style={{ margin: '20px 0 0 0' }}>
                        <Button onClick={addCargoHandler} variant="outlined">
                            Add cargo
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddCargo;
