import React, { Dispatch } from 'react';
import { ThemeProvider } from '@emotion/react';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { createTheme } from '@mui/material';
import { useStyles } from '../../hooks/useStyles';
import { transitCargoType } from '../../store/reducers/transits-reducer/types';
import { cargoType } from '../../store/reducers/cargos-reducer/types';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});
type Props = {
    selectedRow: cargoType;
    rows: cargoType[] | transitCargoType[];
    columns: GridColumns;
    setSelectedRow: Dispatch<React.SetStateAction<cargoType>>;
    setError: Dispatch<React.SetStateAction<string>>;
};

const Table = ({ rows, columns, selectedRow, setSelectedRow }: Props) => {
    const classes = useStyles();

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
