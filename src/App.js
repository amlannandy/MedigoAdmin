import './app.css';
import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import store from './store/index';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
      </Switch>
    </Provider>
  );
};

export default App;
