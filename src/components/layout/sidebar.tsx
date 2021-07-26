import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

class Sidebar extends React.Component {
  state = {
    activeItem: 'home',
  };

  handleItemClick = (e: any, { name }: any) =>
    this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu vertical compact icon='labeled'>
        <Menu.Item
          name='home'
          color='blue'
          as={Link}
          to='/'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item
          name='patients'
          color='blue'
          as={Link}
          to='/patients'
          active={activeItem === 'patients'}
          onClick={this.handleItemClick}>
          <Icon name='users' />
          Patients
        </Menu.Item>
        <Menu.Item
          name='appointments'
          color='blue'
          as={Link}
          to='/appointments'
          active={activeItem === 'appointments'}
          onClick={this.handleItemClick}>
          <Icon name='history' />
          Appointments
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sidebar;
