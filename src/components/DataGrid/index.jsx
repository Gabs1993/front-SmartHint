import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Snackbar, Alert } from '@mui/material';
import ClientModal from '../ModalForm';
import { format } from 'date-fns';



export default function MyDataGrid({ filter }) {
    const [rows, setRows] = React.useState([]);
    const [allRows, setAllRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalRows, setTotalRows] = useState(0);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [clientToEdit, setClientToEdit] = useState(null);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');


    const handleUpdate = (clientData) => {
        setClientToEdit(clientData);
        setOpenEditModal(true);
    };

    const columns = [
        { field: 'nomeRazaoSocial', headerName: 'Nome/Razão Social', width: 200, editable: true },
        { field: 'email', headerName: 'E-mail', width: 200, editable: true },
        { field: 'telefone', headerName: 'Telefone', width: 150, editable: true },
        {
            field: 'dateNascimento',
            headerName: 'Data de Cadastro',
            width: 180,
            editable: true,
            renderCell: (params) => {
                const formattedDate = format(new Date(params.value), 'dd/MM/yyyy');
                return formattedDate;
            }
        },
        {
            field: 'bloqueado',
            headerName: 'Bloqueado',
            width: 130,
            editable: true,
            renderCell: (params) => (
                <Checkbox
                    checked={params.value}
                    onChange={() => handleCheckboxChange(params.row)}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleUpdate(params.row)}
                >
                    Atualizar
                </Button>
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:7049/api/Client/buscarTodos?pageNumber=${pageNumber}&pageSize=${pageSize}`
                );
                setAllRows(response.data.items || []);
                setRows(response.data.items || []);
                setTotalRows(response.data.totalRecords || pageNumber);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };

        fetchData();
    }, [pageNumber, pageSize]);


    useEffect(() => {
        const filteredRows = allRows.filter(row =>
            row.nomeRazaoSocial.toLowerCase().includes(filter.toLowerCase())
        );
        setRows(filteredRows);
        setTotalRows(filteredRows.length);
    }, [filter, allRows]);



    const handlePageChange = (params) => {
        setPageNumber(params.page + 1);
    };

    const handlePageSizeChange = (params) => {
        setPageSize(params.pageSize);
        setPageNumber(1);
    };



    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setClientToEdit(null);
    };

    const handleEditSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.put(`https://localhost:7049/api/Client/${values.id}`, values);

            setSnackbarMessage('Cliente atualizado com sucesso!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === values.id ? { ...row, ...values } : row
                )
            );
            handleCloseEditModal();
        } catch (error) {
            setSnackbarMessage('Ocorreu um erro ao atualizar o cliente.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                rowCount={totalRows}
                checkboxSelection
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    }
                }}
            />
            <ClientModal
                open={openEditModal}
                handleClose={handleCloseEditModal}
                initialValues={clientToEdit || {
                    id: '',
                    nomeRazaoSocial: '',
                    email: '',
                    telefone: '',
                    tipoPessoa: '',
                    cpfCnpj: '',
                    inscricaoEstadual: '',
                    genero: '',
                    dateNascimento: '',
                    bloqueado: undefined,
                    senha: '',
                    confirmarSenha: ''
                }}
                handleSubmit={handleEditSubmit}
            />
            <div>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </Box>
    );
}