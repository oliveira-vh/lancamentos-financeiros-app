import React, { useState, useEffect } from 'react';
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
import axios from 'axios'
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

const api = axios.create({
  baseURL: `https://reqres.in/api`
})

const Index = () => {
  const classes = useStyles();

  var columns = [
    {title: "ID", field: "id"},
    {title: "Título", field: "first_name"},
    {title: "Tipo", field: "last_name"},
    {title: "Valor", field: "email"}
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [error, setError] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => { 
    api.get("/users")
        .then(res => {               
            setData(res.data.data)
         })
         .catch(error=>{
             console.log("Erro")
         })
  }, [])



  const handleRowDelete = (oldData, resolve) => {
    
    api.delete("/users/"+oldData.id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Exclusão falhou!"])
        setError(true)
        resolve()
      })
  }


  return (
    <div>
      <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
          <div>
            {error && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
            <Button className={classes.button} component={ Link } to="/add" variant="contained" color="primary">
              Adicionar Lançamento
            </Button>
            <MaterialTable
              title="Lançamentos "
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
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
                  emptyDataSourceMessage: 'Sem registros para exibir',
                  deleteText: 'Tem de que deseja exlcuir esta linha?',
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