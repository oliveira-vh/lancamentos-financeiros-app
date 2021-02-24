import React, { useState, useEffect }  from 'react'
import { db } from '../../firebase'
import clsx from 'clsx';
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
    paper: {
        padding: theme.spacing(4),
    },
    fixedHeight: {
        height: 100,
    },
}));

const Index = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [entrada, setEntrada] = useState('')
    const [saida, setSaida] = useState('')

    const getValues = async () => {
        const data = await db.collection('lancamentos').get()
        setEntrada(data.docs.map(doc => ({ ...doc.data() }))
                            .filter(doc => doc.tipo === 'Entrada')
                            .map(doc => parseFloat(doc.valor))
                            .reduce((valor, curr) => valor + curr,0)
                            .toFixed(2))                    
        setSaida(data.docs.map(doc => ({ ...doc.data() }))
                          .filter(doc => doc.tipo === 'Saída')
                          .map(doc => parseFloat(doc.valor))
                          .reduce((valor, curr) => valor + curr,0)
                          .toFixed(2))
    }
    
    useEffect(() => {
        getValues()
    })

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <CardLancamento title='Entrada' valor={entrada} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <CardLancamento title='Saída' valor={saida} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <CardLancamento title='Saldo' valor={(entrada - saida).toFixed(2)} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}

export default Index
