import './app.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/login' exact component={Login} />
    </Switch>
  );
};

export default App;
