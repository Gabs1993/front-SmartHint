import React, { useState } from 'react';
import ButtonAppBar from '../../components/ButtonAppBar';
import { Box, Typography, Button, TextField, Snackbar, Alert } from '@mui/material';
import MyDataGrid from '../../components/DataGrid';
import ClientModal from '../../components/ModalForm';
import axios from 'axios';



function Home() {
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const addClient = async (clientData) => {
        try {
            const response = await axios.post('https://localhost:7049/api/Client/adicionarCliente', clientData);
            return response.data;
        } catch (error) {
            console.error("There was an error adding the client!", error);
            throw error;
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const transformedValues = { ...values };
        try {
            await addClient(transformedValues);
            setSnackbarMessage("Cliente adicionado com sucesso!");
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
    
            handleClose();
        } catch (error) {
            
            const errorMessage = error.response?.data?.message || "Ocorreu um erro ao adicionar o cliente.";
            setSnackbarMessage(errorMessage);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <ButtonAppBar />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                padding: 2
            }}>
                <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
                    Consulte os seus clientes cadastrados na sua loja ou realize o cadastro de novos clientes
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpen}>
                    Adicionar Cliente
                </Button>
                <TextField
                    label="Filtrar"
                    variant="outlined"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 4 }}>
                    <MyDataGrid filter={filter} />
                </Box>
            </Box>
            <ClientModal open={open} handleClose={handleClose} initialValues={{
                id: '',
                nomeRazaoSocial: '',
                email: '',
                telefone: '',
                tipoPessoa: 'fisica',
                cpfCnpj: '',
                inscricaoEstadual: '',
                genero: '',
                dateNascimento: '',
                bloqueado: undefined,
                senha: '',
                confirmarSenha: ''
            }} handleSubmit={handleSubmit} />
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
        </div>
    );
}

export default Home;