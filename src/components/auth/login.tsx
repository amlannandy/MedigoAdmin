import React from 'react';
import './css/login.css';
import { Segment, Grid, Form, Divider, Header, List } from 'semantic-ui-react';

export default class Login extends React.Component {
  render() {
    return (
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
            <Form>
              <Form.Input
                fluid
                icon='mail'
                iconPosition='left'
                placeholder='Email'
              />
              <Form.Input
                fluid
                type='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
              />
              <Form.Button primary fluid type='submit'>
                Login
              </Form.Button>
              <Divider horizontal>Or</Divider>
              <Form.Button fluid type='submit'>
                Create New Account
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
