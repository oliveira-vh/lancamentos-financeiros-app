import React from 'react';
import SignUp from './SignUp'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Lancamentos from './Lancamentos'
import AddLancamento from './AddLancamento'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Header from '../components/Header'
import Logout from '../components/Logout'


function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={SignUp}/>
          <>
            <Header/>
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute exact path='/lancamentos' component={Lancamentos} />
            <PrivateRoute exact path='/add' component={AddLancamento} />
            <PrivateRoute exact path='/logout' component={Logout} />
          </>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
