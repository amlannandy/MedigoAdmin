import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Loader, Grid } from 'semantic-ui-react';

import Sidebar from '../layout/sidebar';
import { AuthState } from '../../reducers/auth';
import { fetchPatients, fetchAppointments } from '../../actions/index';

const Loading = () => {
  return <Loader active>Loading...</Loader>;
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

const AddPatient = Loadable({
  loader: () => import('./addPatient'),
  loading: Loading,
});

interface IndexProps {
  auth: AuthState;
  fetchPatients: (doctorId: string) => void;
  fetchAppointments: (doctorId: string) => void;
}

class Index extends React.Component<IndexProps> {
  componentDidMount() {
    const { auth, fetchAppointments, fetchPatients } = this.props;
    if (auth.authActions.isAuthenticated) {
      const userId = auth.user.id;
      fetchPatients(userId);
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
              <Route path='/add-patient' component={AddPatient} />
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
    fetchPatients: (doctorId: string) => {
      return dispatch(fetchPatients(doctorId));
    },
    fetchAppointments: (doctorId: string) => {
      return dispatch(fetchAppointments(doctorId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
