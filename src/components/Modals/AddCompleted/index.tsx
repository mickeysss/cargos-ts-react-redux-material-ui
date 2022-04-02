import * as React from 'react';
import { Dispatch } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { completeCargoAction } from '../../../store/reducers/transits-reducer/action';
import { cargoType } from '../../../store/reducers/cargos-reducer/types';
import styles from './styles.modules.scss';

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
    setCompletedCargo: Dispatch<React.SetStateAction<cargoType>>;
    completedCargo: cargoType;
    setError: Dispatch<React.SetStateAction<string>>;
};

const inputFieldStyles = {
    marginBottom: '20px',
};

const AddCompleted = ({
    setError,
    completedCargo,
    setCompletedCargo,
}: Props) => {

    const [open, setOpen] = React.useState(false);

    const onChangeHandler = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setCompletedCargo({ ...completedCargo, [name]: value });
    };

    const dispatch = useDispatch()

    const onOpenCompletedHandler = () => {
            if(completedCargo.id) {
                setOpen(true)
                setError('')
            } else{
                setError('Please select item');
            }
    }

    const onCloseCompletedHandler = () => {
        setOpen(false);
    };

    const completeHandler = () => {
        dispatch(completeCargoAction((completedCargo)))

        onCloseCompletedHandler();
    };
    return (
        <div>
            <Button onClick={onOpenCompletedHandler}>Confirm transit</Button>
            <Modal
                onClose={onCloseCompletedHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={open}
            >
                <Box sx={style}>
                    <h2 style={{ marginBottom: '30px' }}>
                        Confirm cargo transit
                    </h2>

                    <InputLabel className={styles.textField} htmlFor="name">
                        Destination
                    </InputLabel>
                    <Input
                        name="name"
                        type="string"
                        value={completedCargo.destination}
                        readOnly={true}
                        className={styles.textField}
                        style={inputFieldStyles}
                    />
                    <InputLabel className={styles.textField} htmlFor="name">
                        Name
                    </InputLabel>
                    <Input
                        name="name"
                        type="string"
                        value={completedCargo.name}
                        readOnly={true}
                        style={inputFieldStyles}
                        className={styles.textField}
                    />
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Input
                        name="category"
                        type="string"
                        defaultValue={completedCargo.category}
                        readOnly={true}
                        style={inputFieldStyles}
                        className={styles.textField}
                    />
                    <InputLabel className={styles.textField} htmlFor="quantity">
                        Confirm quantity
                    </InputLabel>
                    <Input
                        name="quantity"
                        type="number"
                        style={inputFieldStyles}
                        defaultValue={completedCargo.quantity}
                        onChange={(e) => onChangeHandler(e)}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <Button onClick={completeHandler} variant="outlined">
                            Confirm transit
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default AddCompleted;
