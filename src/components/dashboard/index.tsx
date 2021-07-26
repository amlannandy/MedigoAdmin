import React from 'react';
import { Grid } from 'semantic-ui-react';

import Sidebar from '../layout/sidebar';

class Index extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={14}>
            <h1>Dashboard</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Index;
