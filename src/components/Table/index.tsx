import React, { Dispatch, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { createTheme } from '@mui/material';
import { cargoType } from '../../App';
import { useStyles } from '../../hooks/useStyles';

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
};

const Table = ({ rows, columns, selectedRow, setSelectedRow }: Props) => {
    const classes = useStyles();

    useEffect(() => {
        return localStorage.setItem('cargos-list', JSON.stringify(rows));
    }, [rows]);

    return (
        <div style={{ height: 400, width: '100%', color: 'white' }}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    experimentalFeatures={{ newEditingApi: true }}
                    onRowClick={(e) =>
                        selectedRow ? setSelectedRow(e.row as cargoType) : null
                    }
                    classes={classes}
                />
            </ThemeProvider>
        </div>
    );
};

export default Table;
