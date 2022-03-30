import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 0,
        },
    },
});
