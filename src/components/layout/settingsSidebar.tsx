import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

interface SettingsSidebarProps {
  url: string;
}

class SettingsSidebar extends React.Component<SettingsSidebarProps> {
  state = {
    activeItem: 'settingsOverview',
  };

  handleItemClick = (e: any, { name }: any) =>
    this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { url } = this.props;

    return (
      <Menu vertical size='large'>
        <Menu.Item
          name='settingsOverview'
          color='blue'
          as={Link}
          to={url}
          active={activeItem === 'settingsOverview'}
          onClick={this.handleItemClick}>
          <Icon name='home' />
          Overview
        </Menu.Item>
        <Menu.Item
          name='updatePassword'
          color='blue'
          as={Link}
          to={`${url}/update-password`}
          active={activeItem === 'updatePassword'}
          onClick={this.handleItemClick}>
          <Icon name='lock open' />
          Update Password
        </Menu.Item>
        <Menu.Item
          name='deleteAccount'
          color='blue'
          as={Link}
          to={`${url}/delete-account`}
          active={activeItem === 'deleteAccount'}
          onClick={this.handleItemClick}>
          <Icon name='user cancel' />
          Delete Account
        </Menu.Item>
      </Menu>
    );
  }
}

export default SettingsSidebar;
