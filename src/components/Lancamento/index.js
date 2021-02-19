import React from 'react'
import { Button, CssBaseline, TextField, Typography, Container, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

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
    const tituloLancamento = React.useRef()
    const valorLancamento = React.useRef()
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [tipoLancamento, setTipoLancamento] = React.useState('');
    const history = useHistory()

    const handleChange = (event) => {
        setTipoLancamento(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
           
        } catch(e){
            
        }
        setLoading(false)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                Adicionar Lançamento
                </Typography>
                {error && <p>{error}</p>}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                    inputRef={tituloLancamento}
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
                    inputRef={valorLancamento}
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
                    onChange={handleChange}
                    >
                    <MenuItem value='entrada'>Entrada</MenuItem>
                    <MenuItem value='saida'>Saída</MenuItem>
                </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                >
                    Salvar
                </Button>
                </form>
            </div>
        </Container>
    )
}

export default Index