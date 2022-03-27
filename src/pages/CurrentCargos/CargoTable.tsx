import * as React from 'react';

import { cargoType } from '../../App';

import {
    DataGrid,
    GridColumns,
    GridPreProcessEditCellProps,
} from '@mui/x-data-grid';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

type Props = {
    cargos: cargoType[];
};

const CargoTable = ({ cargos }: Props) => {
    return (
        <div style={{ height: 400, width: '100%', color: 'white' }}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    rows={cargos}
                    columns={columns}
                    showColumnRightBorder={true}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </ThemeProvider>
        </div>
    );
};

const columns: GridColumns = [
    {
        field: 'name',
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            const hasError = params.props.value.length < 3;
            return { ...params.props, error: hasError };
        },
        headerName: 'Name',
        width: 200,
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'category',
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            const hasError = params.props.value.length < 3;
            return { ...params.props, error: hasError };
        },
        headerName: 'Category',
        width: 200,
        type: 'string',
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'quantity',
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            const hasError = params.props.value < 0;
            return { ...params.props, error: hasError };
        },
        headerName: 'Quantity',
        width: 200,
        type: 'number',
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
];

export default CargoTable;
