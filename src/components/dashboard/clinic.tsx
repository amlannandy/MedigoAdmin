import React from 'react';
import './css/clinic.css';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Loader,
  Message,
  Button,
  Icon,
  Grid,
  List,
  Header,
  ButtonGroup,
  Confirm,
} from 'semantic-ui-react';

import { AuthState } from '../../reducers/auth';
import { deleteClinic } from '../../actions/index';
import UpdateClinicPhotoModal from './updateClinicPhotoModal';
import { ClinicState as ClinicModel } from '../../reducers/clinic';

interface ClinicProps extends RouteComponentProps<any> {
  auth: AuthState;
  clinic: ClinicModel;
  deleteClinic: (id: string, doctorId: string) => void;
}

interface ClinicState {
  showDeleteClinicModal: boolean;
  showUpdateClinicPhotoModal: boolean;
}

class Clinic extends React.Component<ClinicProps, ClinicState> {
  state = {
    showDeleteClinicModal: false,
    showUpdateClinicPhotoModal: false,
  };

  handleDeleteClinic = () => {
    const { clinic, deleteClinic } = this.props;
    this.setState({ showDeleteClinicModal: false }, () => {
      deleteClinic(clinic.clinic.id, clinic.clinic.doctorId);
    });
  };

  render() {
    const { auth, clinic, history } = this.props;

    return (
      <React.Fragment>
        {clinic.clinicActions.isFetching ? (
          <Loader active>Loading your Clinic...</Loader>
        ) : clinic.clinicActions.isDeleting ? (
          <Loader active>Deleting...</Loader>
        ) : clinic.clinicActions.error ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{clinic.clinicActions.error}</p>
          </Message>
        ) : !clinic.clinic ? (
          <Message info size='large'>
            <Message.Header>Oops!</Message.Header>
            <p>Looks like you haven't registered your clinic yet</p>
            <Button
              inverted
              primary
              onClick={() => history.push('/add-clinic')}>
              Register Now
            </Button>
          </Message>
        ) : (
          <React.Fragment>
            <Message>
              <Message.Content>
                <Grid>
                  <Grid.Column width={6}>
                    <img
                      src={clinic.clinic.imageUrl}
                      className='image-container'
                      alt='clinic'
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Header as='h3'>{clinic.clinic.name}</Header>
                    <List>
                      <List.Item>
                        <List.Icon name='users' />
                        <List.Content>
                          {auth.user ? `Dr. ${auth.user.name}` : ''}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>{clinic.clinic.address}</List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name='mail' />
                        <List.Content>{clinic.clinic.email}</List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name='phone' />
                        <List.Content>{clinic.clinic.phone}</List.Content>
                      </List.Item>
                    </List>
                    <ButtonGroup>
                      <Button icon labelPosition='right'>
                        <Icon name='edit' />
                        Edit
                      </Button>
                      <Button
                        icon
                        labelPosition='right'
                        color='yellow'
                        onClick={() =>
                          this.setState({ showUpdateClinicPhotoModal: true })
                        }>
                        <Icon name='photo' />
                        Update Photo
                      </Button>
                      <Button
                        icon
                        negative
                        labelPosition='right'
                        onClick={() =>
                          this.setState({ showDeleteClinicModal: true })
                        }>
                        <Icon name='trash' />
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Grid.Column>
                </Grid>
              </Message.Content>
            </Message>
            <Header color='blue'>
              <Icon name='google plus circle' /> Find on Google Maps
            </Header>
            <div className='map-container'>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={{
                  lat: clinic.clinic.location.latitude,
                  lng: clinic.clinic.location.longitude,
                }}
                defaultZoom={11}>
                <div className='map-marker'>
                  <Icon
                    name='hospital symbol'
                    color='blue'
                    size='big'
                    lat={clinic.clinic.location.latitude}
                    lng={clinic.clinic.location.longitude}
                  />
                  <p>Your Clinic</p>
                </div>
              </GoogleMapReact>
            </div>
          </React.Fragment>
        )}
        <Confirm
          open={this.state.showDeleteClinicModal}
          onCancel={() => this.setState({ showDeleteClinicModal: false })}
          onConfirm={this.handleDeleteClinic}
        />
        <UpdateClinicPhotoModal
          isOpen={this.state.showUpdateClinicPhotoModal}
          closeModal={() =>
            this.setState({ showUpdateClinicPhotoModal: false })
          }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    clinic: state.clinic,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    deleteClinic: (id: string, doctorId: string) => {
      return dispatch(deleteClinic(id, doctorId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
