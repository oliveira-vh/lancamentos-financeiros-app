import React, { useState } from 'react'
import { db } from '../../firebase'
import { Button, CssBaseline, TextField, Typography, Container, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(18),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    select: {
      width: '100%',
      marginTop: theme.spacing(1)
    }   
}))

const Index = () => {
    const classes = useStyles()
    const [tituloLancamento, setTituloLancamento] = useState('')
    const [valorLancamento, setValorLancamento] = useState('')
    const [tipoLancamento, setTipoLancamento] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    
    
    const handleChangeTitulo = (event) => {
        setTituloLancamento(event.target.value);
    };

    const handleChangeTipo = (event) => {
        setTipoLancamento(event.target.value);
    };

    const handleChangeValor = (event) => {
        setValorLancamento(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            if(/(?<=^| )\d+(\.\d+)?(?=$| )|(?<=^| )\.\d+(?=$| )/.test(valorLancamento)){
                db.collection('lancamentos').add({
                    tipo: tipoLancamento, 
                    titulo: tituloLancamento,
                    valor: valorLancamento
                })
                setSuccess('Lançamento adicionado com sucesso!')
            } else {
                setError('Erro. Valor precisa ser um número válido e separado por ponto!')
            }
        } catch{
            setError('Erro. Tente Novamente!')
        }
        
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                Adicionar Lançamento
                </Typography>
                {error && 
                    <Alert onClose={() => setError('')} severity='error'>
                        {error}
                    </Alert>
                }
                {success && 
                    <Alert onClose={() => setSuccess('')}>
                        {success}
                    </Alert>
                }  
                <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    onChange={handleChangeTitulo}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="tituloLancamento"
                    label="Título do Lançamento"
                    name="tituloLancamento"
                    type="text"
                    autoFocus
                />
                <TextField
                    onChange={handleChangeValor}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="valorLancamento"
                    label="Valor    "
                    type="text"
                    id="valorLancamento"
                />
                <FormControl className={classes.select}>
                <InputLabel id="tipoLancamentoLabel">Tipo de Lançamento</InputLabel>
                <Select
                    labelId="tipoLancamentoLabel"
                    id="tipoLancamento"
                    value={tipoLancamento}
                    fullWidth
                    onChange={handleChangeTipo}
                    required
                    >
                    <MenuItem value='Entrada'>Entrada</MenuItem>
                    <MenuItem value='Saída'>Saída</MenuItem>
                </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Salvar
                </Button>
                </form>
            </div>
        </Container>
    )
}

export default Index