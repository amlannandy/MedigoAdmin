import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Header, List, Icon } from 'semantic-ui-react';

class SettingsOverview extends React.Component<RouteComponentProps> {
  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <Header as='h2' color='grey'>
          <Icon name='settings' />
          <Header.Content>
            Account Settings
            <Header.Subheader>Configure your account</Header.Subheader>
          </Header.Content>
        </Header>
        <p>What would you like to change about your account?</p>
        <List bulleted>
          <List.Item
            content={
              <Link to={`${match.url}/change-email`}>
                I want to change the email address associated with my account
              </Link>
            }
          />
          <List.Item
            content={
              <Link to={`${match.url}/update-password`}>
                I want to update my password
              </Link>
            }
          />
          <List.Item
            content={
              <Link to={`${match.url}/delete-account`}>
                I want to delete my account
              </Link>
            }
          />
        </List>
      </React.Fragment>
    );
  }
}

export default SettingsOverview;
