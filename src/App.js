import React from 'react';
import SignUp from './views/SignUp'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Lancamentos from './components/Lancamentos'
import AddLancamento from './views/AddLancamento'
import Login from './views/Login'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Logout from './components/Logout'


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
