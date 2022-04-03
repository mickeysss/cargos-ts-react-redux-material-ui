import { GridColumns } from '@mui/x-data-grid';

export const cargoColumns: GridColumns = [
    {
        field: 'category',
        headerName: 'Category',
        width: 270,
        type: 'string',
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'position',
        headerName: 'Position',
        width: 270,
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 270,
        type: 'string',
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'cargoNumber',
        headerName: 'Cargo number',
        width: 270,
        type: 'number',
        editable: true,
        align: 'left',
        headerAlign: 'left',
    },
];

export const transitColumns: GridColumns = [
    {
        field: 'category',
        headerName: 'Category',
        width: 100,
        type: 'string',
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'position',
        headerName: 'Position',
        width: 150,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'destinationFrom',
        headerName: 'Destination From',
        width: 150,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'destinationTo',
        headerName: 'Destination To',
        width: 150,
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 100,
        type: 'number',
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'cargoNumber',
        headerName: 'Cargo Number',
        width: 150,
        type: 'string',
        align: 'left',
        headerAlign: 'left',
    },

    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        type: 'string',
        align: 'left',
        headerAlign: 'left',
    },
    {
        field: 'attention',
        headerName: 'Attention',
        width: 200,
        type: 'number',
        align: 'left',
        headerAlign: 'left',
    },
];
