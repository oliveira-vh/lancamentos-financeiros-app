import React from 'react'
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
    const [tituloLancamento, setTituloLancamento] = React.useState('')
    const [valorLancamento, setValorLancamento] = React.useState('')
    const [tipoLancamento, setTipoLancamento] = React.useState('')
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')
    
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
           db.collection('lancamentos').add({
               tipo: tipoLancamento, 
               titulo: tituloLancamento,
               valor: valorLancamento
           })
           setSuccess('Lançamento adicionado com sucesso!')
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
                    label="Valor"
                    type="number"
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