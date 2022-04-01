import * as React from 'react';
import { ChangeEvent, Dispatch } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
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
};

const AddTransit = ({
    selectedCargo,
    setSelectedCargo,
    rowsInTransit,
    setRowsInTransit,
}: Props) => {
    const [open, setOpen] = React.useState(false);
    const selectedCargoHandler = (
        e:
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent
    ) => {
        const { name, value } = e.target;

        setSelectedCargo({
            ...selectedCargo,
            id: Date.now(),
            [name]: value,
            status: 'In transit',
            attention: '-',
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
                attention: '',
            });

            setOpen(false);
        }
        localStorage.setItem(
            'transits',
            JSON.stringify([...rowsInTransit, selectedCargo])
        );
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

    const inputFieldStyles = {
        marginBottom: '20px',
    };

    console.log(selectedCargo);
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
                        style={inputFieldStyles}
                    />
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Input
                        name="category"
                        type="string"
                        defaultValue={selectedCargo.category}
                        readOnly={true}
                        style={inputFieldStyles}
                    />
                    <InputLabel htmlFor="quantity">Choose quantity</InputLabel>
                    <Input
                        name="quantity"
                        type="number"
                        onChange={(e) => selectedCargoHandler(e)}
                        style={inputFieldStyles}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="destination">
                            Choose destination
                        </InputLabel>
                        <Select
                            labelId="destination"
                            id="destination"
                            name="destination"
                            label="Choose department"
                            onChange={(e: SelectChangeEvent) =>
                                selectedCargoHandler(e)
                            }
                            defaultValue=""
                            style={inputFieldStyles}
                        >
                            <MenuItem value="Krasnodar">Krasnodar</MenuItem>
                            <MenuItem value="Moscow">Moscow</MenuItem>
                            <MenuItem value="Rostov">Rostov</MenuItem>
                        </Select>
                    </FormControl>
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
