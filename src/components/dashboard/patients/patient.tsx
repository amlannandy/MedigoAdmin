import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {
  Grid,
  Loader,
  Message,
  ButtonGroup,
  Button,
  Icon,
  Header,
  Divider,
  List,
  Card,
  Confirm,
} from 'semantic-ui-react';

import { PatientsState } from '../../../reducers/patients';
import {
  fetchPatient,
  deletePatient,
  fetchPatients,
} from '../../../actions/index';
import EditPatientModal from './editPatientModal';

interface PatientProps extends RouteComponentProps<any> {
  patients: PatientsState;
  fetchPatient: (id: string) => void;
  fetchPatients: (doctorId: string) => void;
  deletePatient: (id: string, callback: () => void) => void;
}

interface PatientState {
  showEditPatientModal: boolean;
  showDeletePatientModal: boolean;
}

class Patient extends React.Component<PatientProps, PatientState> {
  state = {
    showEditPatientModal: false,
    showDeletePatientModal: false,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      fetchPatient,
    } = this.props;
    fetchPatient(id);
  }

  capitalize = (s: string): string => {
    if (!s) return null;
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  handleDeletePatient = () => {
    const {
      match: {
        params: { id },
      },
      patients: { patient },
      deletePatient,
    } = this.props;
    deletePatient(id, () => this.deletePatientCallback(patient.id));
  };

  editPatientCallback = () => {
    const {
      match: {
        params: { id },
      },
      fetchPatient,
    } = this.props;
    this.setState({ showEditPatientModal: false });
    fetchPatient(id);
  };

  deletePatientCallback = (id: string) => {
    const { history, fetchPatients } = this.props;
    history.replace('/patients');
    fetchPatients(id);
  };

  render() {
    const {
      patients: { patient, patientActions },
    } = this.props;

    return (
      <React.Fragment>
        {patientActions.isFetching || !patient ? (
          <Loader active>Loading Patient Data...</Loader>
        ) : patientActions.error ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{patientActions.error}</p>
          </Message>
        ) : (
          <React.Fragment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as='h2'>
                    <Icon name='user' color='grey' />
                    <Header.Content>
                      {patient.name}
                      <Header.Subheader>{`${this.capitalize(patient.gender)} ${
                        patient.age
                      } years old`}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column width={8}>
                  <ButtonGroup>
                    <Button icon color='facebook' labelPosition='right'>
                      <Icon name='download' />
                      Download
                    </Button>
                    <Button
                      icon
                      color='yellow'
                      labelPosition='right'
                      onClick={() =>
                        this.setState({ showEditPatientModal: true })
                      }>
                      <Icon name='edit' />
                      Edit
                    </Button>
                    <Button
                      icon
                      negative
                      labelPosition='right'
                      onClick={() =>
                        this.setState({ showDeletePatientModal: true })
                      }>
                      <Icon name='trash' />
                      Delete
                    </Button>
                  </ButtonGroup>
                </Grid.Column>
              </Grid.Row>
              <Divider />
              <Grid.Row>
                <Card.Group>
                  {/* Address */}
                  <Card color='green' className='card'>
                    <Card.Content>
                      <Card.Header>Address Details</Card.Header>
                    </Card.Content>
                    <Card.Content>
                      <List>
                        <List.Item>
                          <List.Icon name='home' />
                          <List.Content>
                            <List.Header as='a'>Address</List.Header>
                            <List.Description>
                              {patient.address.address}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='building' />
                          <List.Content>
                            <List.Header as='a'>City</List.Header>
                            <List.Description>
                              {patient.address.city}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='pin' />
                          <List.Content>
                            <List.Header as='a'>Pincode</List.Header>
                            <List.Description>
                              {patient.address.pincode}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Card.Content>
                  </Card>
                  {/* Health */}
                  <Card color='green' className='card'>
                    <Card.Content>
                      <Card.Header>Medical Details</Card.Header>
                    </Card.Content>
                    <Card.Content>
                      <List>
                        <List.Item>
                          <List.Icon name='sort numeric ascending' />
                          <List.Content>
                            <List.Header as='a'>Height</List.Header>
                            <List.Description>
                              {patient.healthInfo.height} cm
                            </List.Description>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='weight' />
                          <List.Content>
                            <List.Header as='a'>Weight</List.Header>
                            <List.Description>
                              {patient.healthInfo.weight} kg
                            </List.Description>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='diamond' />
                          <List.Content>
                            <List.Header as='a'>Diabetic</List.Header>
                            <List.Description>
                              {patient.healthInfo.isDiabetic ? 'Yes' : 'No'}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Grid.Row>
            </Grid>
          </React.Fragment>
        )}
        <Confirm
          open={this.state.showDeletePatientModal}
          onCancel={() => this.setState({ showDeletePatientModal: false })}
          onConfirm={this.handleDeletePatient}
        />
        {patientActions.isFetching || !patient ? null : (
          <EditPatientModal
            isOpen={this.state.showEditPatientModal}
            closeModal={() => this.setState({ showEditPatientModal: false })}
            successCallback={this.editPatientCallback}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    patients: state.patients,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchPatient: (id: string) => {
      return dispatch(fetchPatient(id));
    },
    fetchPatients: (doctorId: string) => {
      return dispatch(fetchPatients(doctorId));
    },
    deletePatient: (id: string, callback: () => void) => {
      return dispatch(deletePatient(id, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
