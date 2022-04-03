import React, { Dispatch, SetStateAction } from 'react';

import { ThemeProvider } from '@emotion/react';

import { DataGrid, GridColumns, GridRowParams } from '@mui/x-data-grid';
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
    selectedRow: cargoType | transitCargoType;
    rows: cargoType[] | transitCargoType[];
    columns: GridColumns;
    setSelectedRow:
        | Dispatch<React.SetStateAction<cargoType>>
        | Dispatch<React.SetStateAction<transitCargoType>>;
    setError: Dispatch<React.SetStateAction<string>>;
    setErrorTransit?: Dispatch<React.SetStateAction<string>>;
};

const Table = ({
    rows,
    setError,
    columns,
    selectedRow,
    setSelectedRow,
}: Props) => {
    const classes = useStyles();

    const onRowClickHandler = (e: GridRowParams<{ [key: string]: any }>) => {
        setError ? setError('') : null;

        selectedRow
            ? setSelectedRow(
                  e.row as SetStateAction<cargoType> &
                      SetStateAction<transitCargoType>
              )
            : null;
    };

    return (
        <div style={{ height: 400, width: '100%', color: 'white' }}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    rows={rows as cargoType[]}
                    columns={columns}
                    onRowClick={(e) => onRowClickHandler(e)}
                    classes={classes}
                />
            </ThemeProvider>
        </div>
    );
};

export default Table;
