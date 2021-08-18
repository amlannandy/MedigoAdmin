import React from 'react';
import { connect } from 'react-redux';
import { Loader, Form, Header, Message, Icon } from 'semantic-ui-react';

import { isEmail } from '../../utils/helpers';
import { AuthState } from '../../reducers/auth';
import { reloadUser, changeEmail } from '../../actions/index';

interface ChangeEmailProps {
  auth: AuthState;
  reloadUser: () => void;
  changeEmail: (email: string, callback: Function) => void;
}

interface ChangeEmailState {
  email: string;
  error: string;
}

class ChangeEmail extends React.Component<ChangeEmailProps, ChangeEmailState> {
  state = {
    email: '',
    error: null,
  };

  validate = () => {
    const { email } = this.state;
    let emailError: string = null;
    if (!isEmail(email)) {
      emailError = 'Please enter a valid email';
    }
    this.setState({ error: emailError });
  };

  handleOnChange = (e: any) => {
    const newState = { [e.target.name]: e.target.value } as any;
    this.setState(
      {
        ...newState,
      },
      () => this.validate()
    );
  };

  handleChangeEmail = () => {
    const { email } = this.state;
    const { changeEmail } = this.props;
    changeEmail(email, this.changeEmailCallback);
  };

  changeEmailCallback = () => {
    const { reloadUser } = this.props;
    reloadUser();
  };

  render() {
    const {
      auth: { authActions },
    } = this.props;
    const { email, error } = this.state;

    return (
      <React.Fragment>
        {authActions.isUpdating ? (
          <Loader active>Updating...</Loader>
        ) : (
          <React.Fragment>
            <Header as='h2'>
              <Icon name='mail' />
              <Header.Content>
                Change Email Address
                <Header.Subheader>
                  Change the email address associated with your account
                </Header.Subheader>
              </Header.Content>
            </Header>
            {authActions.error ? (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{authActions.error}</p>
              </Message>
            ) : null}
            <Form>
              <Form.Input
                fluid
                name='email'
                value={email}
                error={error}
                icon='mail'
                iconPosition='left'
                placeholder='New Email'
                onChange={this.handleOnChange}
              />
              <Form.Button
                icon
                positive
                labelPosition='right'
                disabled={!email || error}
                onClick={this.handleChangeEmail}>
                <Icon name='check' />
                Update
              </Form.Button>
            </Form>
          </React.Fragment>
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

const mapDispatchToProps = (dispatch: Function) => {
  return {
    reloadUser: () => {
      return dispatch(reloadUser());
    },
    changeEmail: (email: string, callback: Function) => {
      return dispatch(changeEmail(email, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
