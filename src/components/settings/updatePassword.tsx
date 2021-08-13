import React from 'react';
import { connect } from 'react-redux';
import { Loader, Header, Form, Icon, Message } from 'semantic-ui-react';

import { AuthState } from '../../reducers/auth';
import { updatePassword } from '../../actions/index';

interface UpdatePasswordProps {
  auth: AuthState;
  updatePassword: (newPassword: string) => void;
}

interface UpdatePasswordState {
  password1: string;
  password2: string;
  password1Error: string;
  password2Error: string;
  isFormValid: boolean;
}

class UpdatePassword extends React.Component<
  UpdatePasswordProps,
  UpdatePasswordState
> {
  state = {
    password1: '',
    password2: '',
    password1Error: '',
    password2Error: '',
    isFormValid: false,
  };

  handleOnChange = (e: any) => {
    const newState = { [e.target.name]: e.target.value } as any;
    this.setState(
      {
        ...newState,
      },
      () => {
        this.validateForm();
      }
    );
  };

  validateForm = () => {
    const { password1, password2 } = this.state;
    let password1Error = '',
      password2Error = '',
      isFormValid = false;
    if (password1.trim().length === 0) {
      password1Error = 'Please enter a password';
    }
    if (password2.trim().length === 0) {
      password2Error = "Passwords dont't match";
    }
    if (password1 !== password2) {
      password2Error = "Passwords dont't match";
    }
    if (!password1Error && !password2Error) {
      isFormValid = true;
    }
    this.setState({ password1Error, password2Error, isFormValid });
  };

  handleUpdatePassword = () => {
    const { updatePassword } = this.props;
    updatePassword(this.state.password1);
  };

  render() {
    const {
      auth: {
        authActions: { isUpdatingPassword, message, error },
      },
    } = this.props;
    const {
      password1,
      password2,
      password1Error,
      password2Error,
      isFormValid,
    } = this.state;

    return (
      <React.Fragment>
        {isUpdatingPassword ? (
          <Loader active>Updating Password...</Loader>
        ) : (
          <React.Fragment>
            <Header as='h4' content='Update Password' />
            {error ? (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{error}</p>
              </Message>
            ) : null}
            {message ? (
              <Message positive>
                <Message.Header>Success</Message.Header>
                <p>{message}</p>
              </Message>
            ) : null}
            <Form>
              <Form.Input
                fluid
                type='password'
                name='password1'
                value={password1}
                error={password1Error ? password1Error : null}
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                onChange={this.handleOnChange}
              />
              <Form.Input
                fluid
                type='password'
                name='password2'
                value={password2}
                error={password2Error ? password2Error : null}
                icon='lock'
                iconPosition='left'
                placeholder='Confrim Password'
                onChange={this.handleOnChange}
              />
              <Form.Button
                icon
                positive
                labelPosition='right'
                disabled={!isFormValid}
                onClick={this.handleUpdatePassword}>
                <Icon name='check' />
                Confirm
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
    updatePassword: (newPassword: string) => {
      dispatch(updatePassword(newPassword));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
