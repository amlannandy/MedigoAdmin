import React from 'react';
import './css/navbar.css';
import { connect } from 'react-redux';
import { Menu, Dropdown, Comment, Image } from 'semantic-ui-react';

interface NavbarProps {
  user: {
    name: string;
    imageUrl: string;
    email: string;
  };
}

class Navbar extends React.Component<NavbarProps> {
  render() {
    const { user } = this.props;

    return (
      <Menu className='navbar-container' attached='top' color='blue'>
        <Menu.Item header active>
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
          <Dropdown item text='More' iconPosition='left'>
            <Dropdown.Menu>
              <Dropdown.Item icon='user' text='View Profile' />
              <Dropdown.Item icon='settings' text='Account Settings' />
              <Dropdown.Item icon='sign-out' text='Log out' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
