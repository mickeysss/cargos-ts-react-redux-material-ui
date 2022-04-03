import * as yup from 'yup';

export const cargoValidation = yup.object({
    position: yup
        .string()
        .min(4, 'Position should be of minimum 5 characters length')
        .required('Position is required'),
    category: yup
        .string()
        .min(4, 'Category should be of minimum 5 characters length')
        .required('Category is required'),
});

export const transitValidation = yup.object({
    position: yup
        .string()
        .min(4, 'Position should be of minimum 5 characters length')
        .required('Position is required'),
    category: yup
        .string()
        .min(4, 'Category should be of minimum 5 characters length')
        .required('Category is required'),
    destinationFrom: yup.string().required('Department is required'),
    destinationTo: yup.string().required('Department is required'),
    quantity: yup
        .number()
        .min(1, 'Quantity should be minimum 1')
        .required('Quantity is required'),
});
