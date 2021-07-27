import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Dimmer, Loader, Grid } from 'semantic-ui-react';

import Sidebar from '../layout/sidebar';
import { AuthState } from '../../reducers/auth';
import { fetchAppointments } from '../../actions/index';

const Loading = () => {
  return (
    <Dimmer active>
      <Loader indeterminate>Loading...</Loader>
    </Dimmer>
  );
};

const Overview = Loadable({
  loader: () => import('./overview'),
  loading: Loading,
});

const Patients = Loadable({
  loader: () => import('./patients'),
  loading: Loading,
});

const Appointments = Loadable({
  loader: () => import('./appointments'),
  loading: Loading,
});

interface IndexProps {
  auth: AuthState;
  fetchAppointments: (doctorId: string) => void;
}

class Index extends React.Component<IndexProps> {
  componentDidMount() {
    const { auth, fetchAppointments } = this.props;
    if (auth.authActions.isAuthenticated) {
      const userId = auth.user.id;
      fetchAppointments(userId);
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={14}>
            <Switch>
              <Route path='/appointments' component={Appointments} />
              <Route path='/patients' component={Patients} />
              <Route path='/' component={Overview} />
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAppointments: (doctorId: string) => {
      return dispatch(fetchAppointments(doctorId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
