import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
    button: {
        alignSelf: 'flex-end'
    },
    table: {
        marginTop: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    }
}))

const Index = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <main className={classes.content}>
                    <Container maxWidth="lg" className={classes.container}>
                        <Button className={classes.button} component={ Link } to="/add" variant="contained" color="primary">
                            Adicionar Lançamento
                        </Button>
                        <Grid item xs={12} className={classes.table}>
                            <Paper className={classes.paper}>
                                <h1>Tabela</h1>
                            </Paper>
                        </Grid>
                    </Container>
                </main>
            </div>
                
                    
        </>
    )
}

export default Index
