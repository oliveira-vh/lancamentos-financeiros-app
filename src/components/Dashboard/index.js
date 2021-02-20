import React from 'react'
import clsx from 'clsx';
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, Paper } from '@material-ui/core'
import CardLancamento from './CardLancamento'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(4),
    },
}));

const Index = () => {
    const classes = useStyles();
    const [error, setError] = React.useState("")
    const { logout, currentUser } = useAuth()
    const history = useHistory()

    const handleLogout = async() => {
        setError('')

        try{
            logout()
            history.push('/login')
        } catch(e) {
            setError('Erro ao deslogar!')
        }
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <>
        <div className={classes.root}>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <CardLancamento />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <CardLancamento />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <CardLancamento />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
        <strong>Usuário: </strong>{currentUser.email}<br></br>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Index
