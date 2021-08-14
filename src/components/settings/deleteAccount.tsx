import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Loader, Form, Icon, Message, Header } from 'semantic-ui-react';

import { AuthState } from '../../reducers/auth';
import { verifyPassword, deleteAccout } from '../../actions/index';

interface DeleteAccountProps extends RouteComponentProps<any> {
  auth: AuthState;
  deleteAccount: (clinicId: string) => void;
  verifyPassword: (email: string, password: string, callback: Function) => void;
}

interface DeleteAccountState {
  password1: string;
  password2: string;
  password1Error: string;
  password2Error: string;
  isFormValid: boolean;
}

class DeleteAccount extends React.Component<
  DeleteAccountProps,
  DeleteAccountState
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

  handleDeleteAccount = () => {
    const {
      auth: { user },
      verifyPassword,
      deleteAccount,
    } = this.props;
    verifyPassword(user.email, this.state.password1, () =>
      deleteAccount(user.clinicId)
    );
  };

  render() {
    const {
      auth: {
        authActions: { isVerifyingPassword, isDeleting, error },
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
        {isVerifyingPassword ? (
          <Loader active>Verifying Password...</Loader>
        ) : isDeleting ? (
          <Loader active>Deleting Account...</Loader>
        ) : (
          <React.Fragment>
            <Header as='h2' color='red'>
              <Icon name='trash' />
              <Header.Content>
                Delete Account
                <Header.Subheader>
                  NOTE: Deletion of account and all its related data cannot be
                  recovered
                </Header.Subheader>
              </Header.Content>
            </Header>
            {error ? (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{error}</p>
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
                negative
                labelPosition='right'
                disabled={!isFormValid}
                onClick={this.handleDeleteAccount}>
                <Icon name='check' />
                Delete Account
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
    deleteAccount: (clinicId?: string) => {
      return dispatch(deleteAccout(clinicId));
    },
    verifyPassword: (email: string, password: string, callback: Function) => {
      return dispatch(verifyPassword(email, password, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
