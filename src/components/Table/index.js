import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import MaterialTable from "material-table";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(2)
  },
}))

const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

const Index = () => {
  const classes = useStyles();


  var columns = [
    {title: "Título", field: "titulo"},
    {title: "Tipo", field: "tipo"},
    {title: "Valor", field: "valor"}
  ]
  const [lancamentos, setLancamentos] = useState([])
  const [error, setError] = useState(false)

  const getLancamentos = async () => {
    const data = await db.collection('lancamentos').get()
    setLancamentos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }

 useEffect(() => {
    try{
      getLancamentos()
      setError(false)
    } catch {
      setError(true)
    }
  }, [])

  const handleDelete = (id) => {
    try{
      db.collection('lancamentos').doc(id).delete()
    }catch{
      setError(true)
    }

  }


  return (
    <div>
      <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
          <div>
            {error && 
              <Alert severity="error">
                  {'Erro ao baixar os lançamentos. Favor tentar novamente.'}
              </Alert>
            }       
          </div>
            <Button className={classes.button} component={ Link } to="/add" variant="contained" color="primary">
              Adicionar Lançamento
            </Button>
            <MaterialTable
              title="Lançamentos"
              columns={columns}
              data={lancamentos}
              icons={tableIcons}
              editable={{
                onRowDelete: (doc) => {
                  handleDelete(doc.id)
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(getLancamentos())
                    }, 500)
                  })
                }
              }}
              localization={{
                body: {
                  editRow:
                    {
                      deleteText: 'Tem certeza que deseja excluir esta linha?',
                      saveTooltip: 'Salvar',
                      cancelTooltip: 'Cancelar',
                      deleteTooltip: 'Apagar'
                    },
                  emptyDataSourceMessage: 'Sem dados',
                },
                header: {
                  actions: 'Ação'
                },
                pagination: {
                  labelRowsSelect: 'linhas',
                  labelDisplayedRows: '{from}-{to} de {count}'
                },
                toolbar: {
                  searchPlaceholder: 'Buscar'
              },
              }}
            />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
    </div>
  );
}

export default Index;