import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { Loader, Grid } from 'semantic-ui-react';

import SettingsSidebar from '../layout/settingsSidebar';

const Loading = () => {
  return <Loader active>Loading...</Loader>;
};

const SettingsOverview = Loadable({
  loader: () => import('./settingsOverview'),
  loading: Loading,
});

const ChangeEmail = Loadable({
  loader: () => import('./changeEmail'),
  loading: Loading,
});

const UpdatePassword = Loadable({
  loader: () => import('./updatePassword'),
  loading: Loading,
});

const DeleteAccount = Loadable({
  loader: () => import('./deleteAccount'),
  loading: Loading,
});

class Index extends React.Component<RouteComponentProps> {
  render() {
    const { match } = this.props;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <SettingsSidebar url={match.url} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Switch>
              <Route
                path={`${match.url}/change-email`}
                component={ChangeEmail}
              />
              <Route
                path={`${match.url}/delete-account`}
                component={DeleteAccount}
              />
              <Route
                path={`${match.url}/update-password`}
                component={UpdatePassword}
              />
              <Route path={match.url} component={SettingsOverview} />
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Index;
