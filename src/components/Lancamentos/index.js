import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper } from '@material-ui/core'
import Table from '../Table'

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
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(4),
    },
    table: {
        marginTop: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(1),
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
                        <Grid item xs={12} className={classes.table}>
                            <Paper className={classes.paper}>
                                <Table />
                            </Paper>
                        </Grid>
                    </Container>
                </main>
            </div>
                
                    
        </>
    )
}

export default Index
