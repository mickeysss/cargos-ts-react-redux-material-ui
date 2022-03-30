import * as React from 'react';
import { Dispatch } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
    Input,
    InputLabel,
} from '@mui/material';
import { cargoType } from '../../../App';

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
    setSelectedCargo: Dispatch<React.SetStateAction<cargoType>>;
    rowsInTransit: cargoType[];
    setRowsInTransit: Dispatch<React.SetStateAction<cargoType[]>>;
    setCompletedCargo: Dispatch<React.SetStateAction<cargoType>>;
    completedCargo: cargoType
};

const AddCompleted = ({
    completedCargo,
    selectedCargo,
}: Props) => {
    const [open, setOpen] = React.useState(false);


    const onOpenCompletedHandler = () => {
            setOpen(true);
    };

    const onCloseCompletedHandler = () => {
        setOpen(false);
    };

    const inputFieldStyles = {
        marginBottom: '20px',
    };

    console.log(selectedCargo);
    console.log('====>completedCargo<====', completedCargo)
    return (
        <div>
            <Button
                onClick={onOpenCompletedHandler}
            >Complete transit</Button>
            <Modal
                onClose={onCloseCompletedHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={open}
            >
                <Box sx={style}>
                    <h1>From stock to destination point</h1>
                    <InputLabel htmlFor="name">Destination</InputLabel>
                    <Input
                        name="name"
                        type="string"
                        value={completedCargo.destination}
                        readOnly={true}
                        style={inputFieldStyles}
                    />
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        name="name"
                        type="string"
                        value={completedCargo.name}
                        readOnly={true}
                        style={inputFieldStyles}
                    />
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Input
                        name="category"
                        type="string"
                        defaultValue={completedCargo.category}
                        readOnly={true}
                        style={inputFieldStyles}
                    />
                    <InputLabel htmlFor="quantity">Quantity</InputLabel>
                    <Input
                        name="quantity"
                        type="number"
                        style={inputFieldStyles}
                        defaultValue={completedCargo.quantity}
                        readOnly
                    />
                    <div style={{ margin: '20px 0 0 0' }}>
                        <Button variant="outlined">
                            Complete
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddCompleted;
