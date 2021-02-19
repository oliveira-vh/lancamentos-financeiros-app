import React from 'react';
import SignUp from './SignUp'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Header from '../components/Header'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={SignUp}/>
          <div>
            <Header/>
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute exact path='/lancamento' component={Dashboard} />
          </div>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
