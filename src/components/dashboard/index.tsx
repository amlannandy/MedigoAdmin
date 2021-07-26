import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route } from 'react-router-dom';
import { Dimmer, Loader, Grid } from 'semantic-ui-react';

import Sidebar from '../layout/sidebar';

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

class Index extends React.Component {
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

export default Index;
