import React from 'react'
import { Button, CssBaseline, TextField, Typography, Container, Link } from '@material-ui/core'
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
    const { login } = useAuth()
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch(e){
            setError(`${e}`)
        }
        setLoading(false)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                Entrar
                </Typography>
                {error && <p>{error}</p>}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                >
                    Login
                </Button>   
                    <Link href="/signup" variant="body2">
                        {"Não tem uma conta? Crie a sua!"}
                    </Link>
                </form>
            </div>
        </Container>
    )
}

export default Index

