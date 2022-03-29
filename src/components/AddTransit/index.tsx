import * as React from 'react';
import { Dispatch } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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
    selectedCargo: { [key: string]: string | number };
    setSelectedCargo: Dispatch<
        React.SetStateAction<{ [key: string]: string | number }>
    >;
    rowsInTransit: { [key: string]: string | number }[];
    setRowsInTransit: Dispatch<
        React.SetStateAction<{ [key: string]: string | number }[]>
    >;
};

const AddTransit = ({
    selectedCargo,
    setSelectedCargo,
    rowsInTransit,
    setRowsInTransit,
}: Props) => {
    const [open, setOpen] = React.useState(false);

    const selectedCargoHandler = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setSelectedCargo({
            ...selectedCargo,
            id: Date.now(),
            [name]: value,
            status: 'In transit',
        });
    };

    const addTransitHandler = () => {
        if (
            selectedCargo.category &&
            selectedCargo.name &&
            selectedCargo.quantity
        ) {
            setRowsInTransit([...rowsInTransit, selectedCargo]);
            setSelectedCargo({
                category: '',
                id: 0,
                name: '',
                quantity: 0,
                status: '',
                destination: '',
            });

            setOpen(false);
        } else {
            return false;
        }
    };

    const onOpenModalHandler = () => {
        if (
            selectedCargo.category &&
            selectedCargo.name &&
            selectedCargo.quantity
        )
            setOpen(true);
    };

    const onCloseModalHandler = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={onOpenModalHandler}>Add new transit</Button>
            <Modal
                onClose={() => onCloseModalHandler()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={open}
            >
                <Box sx={style}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        name="name"
                        type="string"
                        value={selectedCargo.name}
                        readOnly={true}
                    />
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Input
                        name="category"
                        type="string"
                        defaultValue={selectedCargo.category}
                        readOnly={true}
                    />
                    <InputLabel htmlFor="quantity">Choose quantity</InputLabel>
                    <Input
                        name="quantity"
                        type="number"
                        onChange={(e) => selectedCargoHandler(e)}
                        maxRows={selectedCargo.quantity}
                        // defaultValue={selectedCargo.quantity}
                    />
                    <InputLabel htmlFor="destination">
                        Choose transit place
                    </InputLabel>
                    <Input
                        name="destination"
                        type="string"
                        onChange={(e) => selectedCargoHandler(e)}
                    />
                    <div style={{ margin: '20px 0 0 0' }}>
                        <Button onClick={addTransitHandler} variant="outlined">
                            Add transit
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddTransit;
