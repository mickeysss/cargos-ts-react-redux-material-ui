import * as React from 'react';

import { Dispatch } from 'react';

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
    setSelectedCargo: Dispatch<React.SetStateAction<{ [key: string]: any }>>;
};

const CargoTable = ({ cargos, setSelectedCargo }: Props) => {
    const selectedCargoHandler = (e: {
        row: React.SetStateAction<{ [key: string]: any }>;
    }) => setSelectedCargo(e.row);

    return (
        <div style={{ height: 400, width: '100%', color: 'white' }}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    rows={cargos}
                    columns={columns}
                    experimentalFeatures={{ newEditingApi: true }}
                    onRowClick={(e: any) => selectedCargoHandler(e)}
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
        width: 300,
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
        width: 300,
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
        width: 300,
        type: 'number',
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 300,
        type: 'string',
        align: 'left',
        headerAlign: 'left',
    },
];

export default CargoTable;
