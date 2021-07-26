import React from 'react';
import { Provider } from 'react-redux';

import store from './utils/store';
import Index from './components/index';
import { auth } from './utils/firebase';
import { loadUser } from './actions/index';

export default class App extends React.Component {
  componentDidMount() {
    auth.onAuthStateChanged(user =>
      store.dispatch(loadUser(user as any) as any)
    );
  }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}
