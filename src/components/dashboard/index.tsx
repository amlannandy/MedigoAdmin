import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Loader, Grid } from 'semantic-ui-react';

import Sidebar from '../layout/sidebar';
import { AuthState } from '../../reducers/auth';
import { fetchClinic, fetchPatients } from '../../actions/index';

const Loading = () => {
  return <Loader active>Loading...</Loader>;
};

const Overview = Loadable({
  loader: () => import('./overview'),
  loading: Loading,
});

const Patients = Loadable({
  loader: () => import('./patients/patients'),
  loading: Loading,
});

const Appointments = Loadable({
  loader: () => import('./appointments/appointments'),
  loading: Loading,
});

const Clinic = Loadable({
  loader: () => import('./clinic/clinic'),
  loading: Loading,
});

const AddPatient = Loadable({
  loader: () => import('./patients/addPatient'),
  loading: Loading,
});

const AddClinic = Loadable({
  loader: () => import('./clinic/addClinic'),
  loading: Loading,
});

const Patient = Loadable({
  loader: () => import('./patients/patient'),
  loading: Loading,
});

interface IndexProps {
  auth: AuthState;
  fetchClinic: (id: string) => void;
  fetchPatients: (doctorId: string) => void;
}

class Index extends React.Component<IndexProps> {
  componentDidMount() {
    const { auth, fetchPatients, fetchClinic } = this.props;
    if (auth.authActions.isAuthenticated && auth.user) {
      const userId = auth.user.id;
      const clinicId = auth.user.clinicId;
      fetchPatients(userId);
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
              <Route path='/patients/:id' component={Patient} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
