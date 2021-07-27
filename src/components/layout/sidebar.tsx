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
      <Menu vertical size='large'>
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
        <Menu.Item
          name='messages'
          color='blue'
          as={Link}
          to='/messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}>
          <Icon name='mail' />
          Messages
        </Menu.Item>
        <Menu.Item
          name='clinic'
          color='blue'
          as={Link}
          to='/clinic'
          active={activeItem === 'clinic'}
          onClick={this.handleItemClick}>
          <Icon name='hospital' />
          Your Clinic
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sidebar;
