import React from 'react';
import { ThemeProvider } from '@emotion/react';
import {
    DataGrid,
    GridColumns,
    GridPreProcessEditCellProps,
} from '@mui/x-data-grid';
import { createTheme } from '@mui/material';
import { cargoType } from '../../../App';
import { useStyles } from '../../../hooks/useStyles';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

type Props = {
    selectedCargo: cargoType;
    rowsInTransit: cargoType[];
};

const TransitTable = ({ rowsInTransit }: Props) => {
    const classes = useStyles();

    return (
        <div style={{ height: 400, width: '100%', color: 'white' }}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    rows={rowsInTransit}
                    columns={columns}
                    experimentalFeatures={{ newEditingApi: true }}
                    onRowClick={(e) => console.log(e.row)}
                    classes={classes}
                />
            </ThemeProvider>
        </div>
    );
};

const columns: GridColumns = [
    {
        field: 'status',
        headerName: 'Status',
        width: 200,
        type: 'string',
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'destination',
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            const hasError = params.props.value.length < 3;
            return { ...params.props, error: hasError };
        },
        headerName: 'Destination',
        width: 200,
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
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

export default TransitTable;
