import './css/index.css';
import React from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import { Container, Loader } from 'semantic-ui-react';

import Navbar from '../layout/navbar';
import { AuthState } from '../../reducers/auth';

const Loading = () => {
  return <Loader active>Loading...</Loader>;
};

const Dashboard = Loadable({
  loader: () => import('../dashboard/index'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('../profile/index'),
  loading: Loading,
});

const Settings = Loadable({
  loader: () => import('../settings/index'),
  loading: Loading,
});

interface IndexProps {
  auth: AuthState;
}

class Index extends React.Component<IndexProps> {
  render() {
    const { auth } = this.props;

    return (
      <React.Fragment>
        <Navbar />
        {auth &&
        (auth.authActions.isLoading || !auth.authActions.isInitialized) ? (
          <Loader active>Loading...</Loader>
        ) : (
          <Container className='home-container'>
            <Switch>
              <Route path='/settings' component={Settings} />
              <Route path='/profile' component={Profile} />
              <Route path='/' component={Dashboard} />
            </Switch>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Index);
