import React from 'react';
import SignUp from './SignUp'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route exact path='/' component={Dashboard}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
