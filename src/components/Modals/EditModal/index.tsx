import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import { editCargoAction } from '../../../store/reducers/cargos-reducer/actions';

import { cargoType } from '../../../store/reducers/cargos-reducer/types';

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
    selectedCargo: cargoType;
    setSelectedCargo: Dispatch<SetStateAction<cargoType>>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    editHandler: Dispatch<SetStateAction<cargoType>>;
};

const EditModal = ({
    open,
    setOpen,
    selectedCargo,
    setSelectedCargo,
}: Props) => {
    const dispatch = useDispatch();

    const changeCargoHandler = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setSelectedCargo({ ...selectedCargo, [name]: value });
    };

    const editCargoHandler = () => {
        if (selectedCargo.id) {
            dispatch(editCargoAction(selectedCargo));
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
                    <h1>Edit selected cargo</h1>

                    <InputLabel htmlFor="cargoNumber">Cargo number</InputLabel>
                    <Input
                        name="cargoNumber"
                        type="string"
                        defaultValue={selectedCargo.cargoNumber}
                        readOnly={true}
                        disabled={true}
                    />
                    <InputLabel htmlFor="category">
                        Category of cargo
                    </InputLabel>
                    <Input
                        name="category"
                        type="string"
                        defaultValue={selectedCargo.category}
                        onChange={(e) => changeCargoHandler(e)}
                    />
                    <InputLabel htmlFor="name">Add cargo position</InputLabel>
                    <Input
                        name="position"
                        type="string"
                        defaultValue={selectedCargo.position}
                        onChange={(e) => changeCargoHandler(e)}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <Button onClick={editCargoHandler} variant="outlined">
                            Edit Cargo
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default EditModal;
