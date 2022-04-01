import React, { Dispatch } from 'react';

import { useStyles } from '../../hooks/useStyles';

import { ThemeProvider } from '@emotion/react';

import { cargoType } from '../../App';

import {
    DataGrid,
    GridColumns,
    GridRowModel,
    GridRowParams,
} from '@mui/x-data-grid';

import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});
type Props = {
    selectedRow: cargoType;
    rows: cargoType[];
    columns: GridColumns;
    setSelectedRow: Dispatch<React.SetStateAction<cargoType>>;
    setError: Dispatch<React.SetStateAction<string>>;
};

const Table = ({
    rows,
    columns,
    selectedRow,
    setSelectedRow,
    setError,
}: Props) => {
    const classes = useStyles();

    const onRowClickHandler = (e: GridRowParams<GridRowModel>) => {
        setError('');
        if (selectedRow) {
            setSelectedRow(e.row as cargoType);
        } else return null;
    };

    return (
        <div style={{ height: 400, width: '100%', color: 'white' }}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    experimentalFeatures={{ newEditingApi: true }}
                    onRowClick={(e) => onRowClickHandler(e)}
                    classes={classes}
                />
            </ThemeProvider>
        </div>
    );
};

export default Table;
