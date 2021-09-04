import './css/login.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Segment,
  Grid,
  Form,
  Divider,
  Header,
  List,
  Dimmer,
  Loader,
  Message,
} from 'semantic-ui-react';

import { isEmail } from '../../utils/helpers';
import { register } from '../../actions/index';
import { AuthState } from '../../reducers/auth';

interface RegisterProps extends RouteComponentProps<any> {
  auth: AuthState;
  register: (email: string, password: string, callback: Function) => void;
}

interface RegisterState {
  email: string;
  password: string;
  confirmPassword: string;
  form: {
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
    isFormValid: boolean;
  };
}

class Register extends React.Component<RegisterProps, RegisterState> {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    form: {
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      isFormValid: false,
    },
  };

  handleOnChange = (e: any) => {
    const newState = { [e.target.name]: e.target.value } as any;
    this.setState(
      {
        ...newState,
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const { email, password, confirmPassword } = this.state;
    let emailError = '',
      passwordError = '',
      confirmPasswordError = '',
      isFormValid = false;
    if (!isEmail(email)) {
      emailError = 'Please enter a valid email';
    }
    if (password.trim().length < 6) {
      passwordError = 'Please provide a password with minimum 6 characters';
    }
    if (password.trim() !== confirmPassword.trim()) {
      confirmPasswordError = 'Passwords do not match';
    }
    if (!emailError && !passwordError && !confirmPasswordError) {
      isFormValid = true;
    }
    this.setState({
      form: { emailError, passwordError, confirmPasswordError, isFormValid },
    });
  };

  handleRegister = () => {
    const { register } = this.props;
    const { email, password } = this.state;
    register(email, password, this.registerCallback);
  };

  registerCallback = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const {
      auth: {
        authActions: { isLoading, isAuthenticating, error, isInitialized },
      },
    } = this.props;

    const { email, password, confirmPassword, form } = this.state;

    return (
      <React.Fragment>
        {isAuthenticating ? (
          <Dimmer active>
            <Loader indeterminate>Authenticating..</Loader>
          </Dimmer>
        ) : null}
        {isLoading || !isInitialized ? (
          <Dimmer active>
            <Loader indeterminate>Please wait..</Loader>
          </Dimmer>
        ) : (
          <Segment placeholder padded className='login-container'>
            <Grid columns={2} stretched>
              <Grid.Column>
                <Header
                  textAlign='center'
                  as='h1'
                  className='login-header'
                  color='blue'>
                  MediGo
                  <Header.Subheader>
                    Revolutionizing Healthcare
                  </Header.Subheader>
                </Header>
                <List size='large' className='login-list'>
                  <List.Item
                    icon='users'
                    content='Manage your patient records in one place'
                  />
                  <List.Item
                    icon='hospital'
                    content='Organize your clinic records'
                  />
                  <List.Item
                    icon='mail'
                    content='Connect with patients seamlessly'
                  />
                  <List.Item
                    icon='history'
                    content='Schedule Appointments with a single click'
                  />
                </List>
              </Grid.Column>
              <Grid.Column>
                <Header as='h2' textAlign='center' className='login-header'>
                  Register
                  <Header.Subheader>
                    Join us now for a revolutionary set of healthcare perks
                  </Header.Subheader>
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
                    name='email'
                    value={email}
                    error={form.emailError ? form.emailError : null}
                    icon='mail'
                    iconPosition='left'
                    placeholder='Email'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    fluid
                    name='password'
                    value={password}
                    error={form.passwordError ? form.passwordError : null}
                    type='password'
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    fluid
                    name='confirmPassword'
                    value={confirmPassword}
                    error={
                      form.confirmPasswordError
                        ? form.confirmPasswordError
                        : null
                    }
                    type='password'
                    icon='lock'
                    iconPosition='left'
                    placeholder='Confirm Password'
                    onChange={this.handleOnChange}
                  />
                  <Form.Button
                    primary
                    fluid
                    onClick={this.handleRegister}
                    disabled={!form.isFormValid}>
                    Register
                  </Form.Button>
                  <Divider horizontal>Or</Divider>
                  <Form.Button fluid>
                    <Link to='/login'>Login Instead</Link>
                  </Form.Button>
                </Form>
              </Grid.Column>
            </Grid>
          </Segment>
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
    register: (email: string, password: string, callback: Function) => {
      return dispatch(register(email, password, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
