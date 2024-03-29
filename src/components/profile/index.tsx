import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import {
  Grid,
  Loader,
  Card,
  Image,
  Icon,
  List,
  Header,
  Label,
} from 'semantic-ui-react';

import './css/index.css';
import { AuthState } from '../../reducers/auth';
import UpdatePhotoModal from './updatePhotoModal';
import EditBasicDetailsModal from './editBasicDetailsModal';
import EditProfessionalDetailsModal from './editProfessionalDetailsModal';

interface IndexProps {
  auth: AuthState;
}

interface IndexState {
  showUpdatePhotoModal: boolean;
  showBasicDetailsModal: boolean;
  showProfessionalDetailsModal: boolean;
}

class Index extends React.Component<IndexProps, IndexState> {
  state = {
    showUpdatePhotoModal: false,
    showBasicDetailsModal: false,
    showProfessionalDetailsModal: false,
  };

  render() {
    const {
      auth: {
        user,
        authActions: { isInitialized, isLoading },
      },
    } = this.props;
    return (
      <React.Fragment>
        {!isInitialized || isLoading || !user ? (
          <Loader active>Loading Profile...</Loader>
        ) : (
          <React.Fragment>
            <React.Fragment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Card>
                      <Image
                        src={user.imageUrl}
                        wrapped
                        ui={false}
                        label={{
                          as: 'btn',
                          color: 'yellow',
                          corner: 'right',
                          icon: 'save',
                          className: 'icon-button',
                          onClick: () =>
                            this.setState({ showUpdatePhotoModal: true }),
                        }}
                      />
                      <Card.Content>
                        <Card.Header>{user.name}</Card.Header>
                        <Card.Meta>{user.email}</Card.Meta>
                      </Card.Content>
                      <Card.Content extra>
                        <Icon name='calendar' />
                        Joined on {user.createdAt ?? '12/02/2021'}
                      </Card.Content>
                      <Card.Content extra>
                        {user.isVerified ? (
                          <Label color='green'>Profile Verified</Label>
                        ) : (
                          <Label color='red'>Profile not verified yet</Label>
                        )}
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <Card color='green' className='card'>
                          <Card.Content>
                            <Card.Header>
                              <Grid.Row>
                                Personal Details
                                <Grid.Column floated='right'>
                                  <Icon
                                    className='icon-button'
                                    name='edit'
                                    onClick={() =>
                                      this.setState({
                                        showBasicDetailsModal: true,
                                      })
                                    }
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Card.Header>
                          </Card.Content>
                          <Card.Content>
                            <List>
                              <List.Item>
                                <List.Icon name='user' />
                                <List.Content>
                                  <List.Header as='a'>Name</List.Header>
                                  <List.Description>
                                    {user.name}
                                  </List.Description>
                                </List.Content>
                              </List.Item>
                              <List.Item>
                                <List.Icon name='mail' />
                                <List.Content>
                                  <List.Header as='a'>
                                    Email Address
                                  </List.Header>
                                  <List.Description>
                                    {user.email}
                                  </List.Description>
                                </List.Content>
                              </List.Item>
                              <List.Item>
                                <List.Icon name='phone' />
                                <List.Content>
                                  <List.Header as='a'>Phone Number</List.Header>
                                  <List.Description>
                                    {user.phone}
                                  </List.Description>
                                </List.Content>
                              </List.Item>
                              <List.Item>
                                <List.Icon name='user secret' />
                                <List.Content>
                                  <List.Header as='a'>Age</List.Header>
                                  <List.Description>
                                    {user.age} years
                                  </List.Description>
                                </List.Content>
                              </List.Item>
                            </List>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <Card color='orange' className='card fluid-card'>
                          <Card.Content>
                            <Card.Header>
                              <Grid.Row>
                                Professional Details
                                <Grid.Column floated='right'>
                                  <Icon
                                    className='icon-button'
                                    name='edit'
                                    onClick={() =>
                                      this.setState({
                                        showProfessionalDetailsModal: true,
                                      })
                                    }
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Card.Header>
                          </Card.Content>
                          <Card.Content>
                            <List>
                              <List.Item>
                                <List.Icon name='users' />
                                <List.Content>
                                  <List.Header as='a'>Field</List.Header>
                                  <List.Description>
                                    {user.field}
                                  </List.Description>
                                </List.Content>
                              </List.Item>
                              <List.Item>
                                <List.Icon name='hospital' />
                                <List.Content>
                                  <List.Header as='a'>Hospital</List.Header>
                                  <List.Description>
                                    {user.hospital}
                                  </List.Description>
                                </List.Content>
                              </List.Item>
                              <List.Item>
                                <List.Icon name='time' />
                                <List.Content>
                                  <List.Header as='a'>
                                    Years of Experience
                                  </List.Header>
                                  <List.Description>
                                    {user.experience} years
                                  </List.Description>
                                </List.Content>
                              </List.Item>
                              <List.Item>
                                <List.Icon name='home' />
                                <List.Content>
                                  <List.Header as='a'>City</List.Header>
                                  <List.Description>
                                    {user.city}
                                  </List.Description>
                                </List.Content>
                              </List.Item>
                            </List>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </Grid.Row>
                    <Header color='blue'>
                      <Icon name='pin' size='tiny' />
                      Your Location
                    </Header>
                    <div className='map-container'>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                        }}
                        defaultCenter={{
                          lat: user.location.latitude,
                          lng: user.location.longitude,
                        }}
                        defaultZoom={11}>
                        <div className='map-marker'>
                          <Icon
                            name='user'
                            color='blue'
                            size='big'
                            lat={user.location.latitude}
                            lng={user.location.longitude}
                          />
                          <p>You</p>
                        </div>
                      </GoogleMapReact>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </React.Fragment>
            <UpdatePhotoModal
              isOpen={this.state.showUpdatePhotoModal}
              closeModal={() => this.setState({ showUpdatePhotoModal: false })}
            />
            <EditBasicDetailsModal
              isOpen={this.state.showBasicDetailsModal}
              closeModal={() => this.setState({ showBasicDetailsModal: false })}
            />
            <EditProfessionalDetailsModal
              isOpen={this.state.showProfessionalDetailsModal}
              closeModal={() =>
                this.setState({ showProfessionalDetailsModal: false })
              }
            />
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

export default connect(mapStateToProps)(Index);
