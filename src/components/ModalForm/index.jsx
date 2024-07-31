import React from 'react';
import { Box, Typography, Button, Modal, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText, Grid } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ClientModal = ({ open, handleClose, initialValues, handleSubmit }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {initialValues.id ? "Editar Cliente" : "Adicionar Cliente"}
                </Typography>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Cliente/Razão Social"
                                        name="nomeRazaoSocial"
                                        value={values.nomeRazaoSocial}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        fullWidth
                                        margin="normal"
                                        helperText={<ErrorMessage name="nomeRazaoSocial" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="E-Mail"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        fullWidth
                                        margin="normal"
                                        helperText={<ErrorMessage name="email" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Telefone"
                                        name="telefone"
                                        value={values.telefone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        fullWidth
                                        margin="normal"
                                        helperText={<ErrorMessage name="telefone" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Tipo de Pessoa</InputLabel>
                                        <Select
                                            name="tipoPessoa"
                                            value={values.tipoPessoa}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value="fisica">Física</MenuItem>
                                            <MenuItem value="juridica">Jurídica</MenuItem>
                                        </Select>
                                        <FormHelperText><ErrorMessage name="tipoPessoa" /></FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputMask
                                        mask={values.tipoPessoa === 'fisica' ? '999.999.999-99' : '99.999.999/0001-99'}
                                        value={values.cpfCnpj}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        maskChar={null}
                                    >
                                        {(inputProps) => (
                                            <TextField
                                                {...inputProps}
                                                label="CPF/CNPJ"
                                                name="cpfCnpj"
                                                fullWidth
                                                margin="normal"
                                                helperText={<ErrorMessage name="cpfCnpj" />}
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputMask
                                        mask="999.999.999-999"
                                        value={values.inscricaoEstadual}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        maskChar={null}
                                    >
                                        {(inputProps) => (
                                            <TextField
                                                {...inputProps}
                                                label="Inscrição Estadual"
                                                name="inscricaoEstadual"
                                                fullWidth
                                                margin="normal"
                                                helperText={<ErrorMessage name="inscricaoEstadual" />}
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                                {values.tipoPessoa === 'fisica' && (
                                    <>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth margin="normal">
                                                <InputLabel>Gênero</InputLabel>
                                                <Select
                                                    name="genero"
                                                    value={values.genero}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <MenuItem value="masculino">Masculino</MenuItem>
                                                    <MenuItem value="feminino">Feminino</MenuItem>
                                                    <MenuItem value="outro">Outro</MenuItem>
                                                </Select>
                                                <FormHelperText><ErrorMessage name="genero" /></FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Data de Nascimento"
                                                name="dateNascimento"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                value={values.dataNascimento}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                fullWidth
                                                margin="normal"
                                                helperText={<ErrorMessage name="dataNascimento" />}
                                            />
                                        </Grid>
                                    </>
                                )}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Bloqueado</InputLabel>
                                        <Select
                                            name="bloqueado"
                                            value={values.bloqueado ? 'true' : 'false'} // Convert boolean to string for Select
                                            onChange={e => {
                                                const value = e.target.value === 'true';
                                                handleChange({
                                                    target: {
                                                        name: 'bloqueado',
                                                        value,
                                                    },
                                                });
                                            }}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value="true">Sim</MenuItem>
                                            <MenuItem value="false">Não</MenuItem>
                                        </Select>
                                        <FormHelperText><ErrorMessage name="bloqueado" /></FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Senha"
                                        name="senha"
                                        type="password"
                                        value={values.senha}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        fullWidth
                                        margin="normal"
                                        helperText={<ErrorMessage name="senha" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Confirmação de Senha"
                                        name="confirmarSenha"
                                        type="password"
                                        value={values.confirmarSenha}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        fullWidth
                                        margin="normal"
                                        helperText={<ErrorMessage name="confirmacaoSenha" />}
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                Salvar
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default ClientModal;