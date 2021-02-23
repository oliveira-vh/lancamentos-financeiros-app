import React from 'react'
import { Button, CssBaseline, TextField, Typography, Container, Link } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
}))

const Index = () => {
    const classes = useStyles()
    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const passwordConfirmRef = React.useRef()
    const { signup } = useAuth()
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Senhas não são idênticas!')
        }

        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/login')
        } catch{
            setError('Erro ao criar a conta!')
        }
        setLoading(false)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                Cadastro
                </Typography>
                {error && <Alert severity='error'>{error}</Alert>}
                <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    inputRef={emailRef}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    autoFocus
                />
                <TextField
                    inputRef={passwordRef}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                />
                <TextField
                    inputRef={passwordConfirmRef}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Confirmar senha"
                    type="password"
                    id="passwordConfirm"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                >
                    Cadastrar
                </Button>   
                    <Link href="/login" variant="body2">
                        {"Já tem uma conta? Faça Login!"}
                    </Link>
                </form>
            </div>
        </Container>
    )
}

export default Index
