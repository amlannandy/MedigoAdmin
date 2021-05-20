import './app.css';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import store from './store/index';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { getCurrentUser } from './store/actions/auth';

const App = () => {
  useEffect(() => {
    store.dispatch(getCurrentUser());
  }, []);

  return (
    <Provider store={store}>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/' component={Home} />
      </Switch>
    </Provider>
  );
};

export default App;
