import React from 'react';
import './css/navbar.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Menu, Dropdown, Comment, Image } from 'semantic-ui-react';

import { logout } from '../../actions/index';

interface NavbarProps {
  user: {
    name: string;
    imageUrl: string;
    email: string;
  };
  logout: () => void;
}

class Navbar extends React.Component<NavbarProps> {
  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { user } = this.props;

    return (
      <Menu className='navbar-container' attached='top' color='blue' inverted>
        <Container>
          <Menu.Item header active as={Link} to='/'>
            MediGo
          </Menu.Item>
          <Menu.Menu position='right'>
            {user ? (
              <Menu.Item className='nav-user-section'>
                <Comment.Avatar
                  src={user.imageUrl}
                  className='nav-user-img'
                  as={Image}
                  avatar
                />
                <Comment>
                  <Comment.Content>
                    <Comment.Author>
                      <strong>{user.name}</strong>
                    </Comment.Author>
                    <Comment.Text>{user.email}</Comment.Text>
                  </Comment.Content>
                </Comment>
              </Menu.Item>
            ) : null}
            <Dropdown item icon='angle down' className='nav-dropdown-icon'>
              <Dropdown.Menu>
                <Dropdown.Item
                  icon='user'
                  text='View Profile'
                  as={Link}
                  to='/profile'
                />
                <Dropdown.Item
                  icon='settings'
                  text='Account Settings'
                  as={Link}
                  to='/settings'
                />
                <Dropdown.Item
                  icon='sign-out'
                  text='Log out'
                  onClick={this.handleLogout}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => {
      return dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
