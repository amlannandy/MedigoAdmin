import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Loader, Grid } from 'semantic-ui-react';

import Sidebar from '../layout/sidebar';
import { AuthState } from '../../reducers/auth';
import {
  fetchClinic,
  fetchPatients,
  fetchAppointments,
} from '../../actions/index';

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

const Clinic = Loadable({
  loader: () => import('./clinic'),
  loading: Loading,
});

const AddPatient = Loadable({
  loader: () => import('./addPatient'),
  loading: Loading,
});

const AddClinic = Loadable({
  loader: () => import('./addClinic'),
  loading: Loading,
});

interface IndexProps {
  auth: AuthState;
  fetchClinic: (id: string) => void;
  fetchPatients: (doctorId: string) => void;
  fetchAppointments: (doctorId: string) => void;
}

class Index extends React.Component<IndexProps> {
  componentDidMount() {
    const { auth, fetchAppointments, fetchPatients, fetchClinic } = this.props;
    if (auth.authActions.isAuthenticated) {
      const userId = auth.user.id;
      const clinicId = auth.user.clinicId;
      fetchPatients(userId);
      fetchAppointments(userId);
      if (clinicId) {
        fetchClinic(clinicId);
      }
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>
            <Switch>
              <Route path='/appointments' component={Appointments} />
              <Route path='/add-patient' component={AddPatient} />
              <Route path='/add-clinic' component={AddClinic} />
              <Route path='/patients' component={Patients} />
              <Route path='/clinic' component={Clinic} />
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
    fetchClinic: (id: string) => {
      return dispatch(fetchClinic(id));
    },
    fetchPatients: (doctorId: string) => {
      return dispatch(fetchPatients(doctorId));
    },
    fetchAppointments: (doctorId: string) => {
      return dispatch(fetchAppointments(doctorId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
