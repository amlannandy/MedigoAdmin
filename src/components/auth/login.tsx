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

import { login } from '../../actions/index';
import { isEmail } from '../../utils/helpers';

interface LoginProps extends RouteComponentProps<any> {
  authActions: {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    error: string;
  };
  login: (email: string, password: string, callback: () => void) => void;
}

interface LoginState {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  isFormValid: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isFormValid: false,
    };
  }

  handleOnChange = (e: any) => {
    let newState = { [e.target.name]: e.target.value } as Pick<
      LoginState,
      keyof LoginState
    >;
    this.setState(
      {
        ...newState,
      },
      () => {
        const { email, password } = this.state;
        let emailError = '',
          passwordError = '';
        let isFormValid = false;
        if (!isEmail(email)) {
          emailError = 'Please enter a valid email';
        }
        if (password.trim().length < 6) {
          passwordError = 'Please provide a password with minimum 6 characters';
        }
        if (!emailError && !passwordError) {
          isFormValid = true;
        }
        this.setState({ emailError, passwordError, isFormValid });
      }
    );
  };

  handleLogin = () => {
    const { login } = this.props;
    const { email, password } = this.state;
    login(email, password, this.loginCallback);
  };

  loginCallback = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const {
      authActions: { isAuthenticated, isAuthenticating, error },
    } = this.props;

    return (
      <React.Fragment>
        {isAuthenticating ? (
          <Dimmer active>
            <Loader indeterminate>Authenticating..</Loader>
          </Dimmer>
        ) : null}
        <Segment placeholder padded className='login-container'>
          <Grid columns={2} stretched>
            <Grid.Column>
              <Header
                textAlign='center'
                as='h1'
                className='login-header'
                color='blue'>
                MediGo
                <Header.Subheader>Revolutionizing Healthcare</Header.Subheader>
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
                Login
                <Header.Subheader>
                  Manage your clinic and patients efficiently
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
                  value={this.state.email}
                  error={this.state.emailError ? this.state.emailError : null}
                  icon='mail'
                  iconPosition='left'
                  placeholder='Email'
                  onChange={this.handleOnChange}
                />
                <Form.Input
                  fluid
                  name='password'
                  value={this.state.password}
                  error={
                    this.state.passwordError ? this.state.passwordError : null
                  }
                  type='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  onChange={this.handleOnChange}
                />
                <Form.Button
                  primary
                  fluid
                  onClick={this.handleLogin}
                  disabled={!this.state.isFormValid}>
                  Login
                </Form.Button>
                <Divider horizontal>Or</Divider>
                <Form.Button fluid>
                  <Link to='/register'>Create a New Account</Link>
                </Form.Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    authActions: state.auth.authActions,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (email: string, password: string, callback: () => void) => {
      return dispatch(login(email, password, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
