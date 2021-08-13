import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Loader,
  Table,
  Button,
  Icon,
  Confirm,
  Message,
} from 'semantic-ui-react';

import { AuthState } from '../../../reducers/auth';
import { PatientsState } from '../../../reducers/patients';
import { fetchPatients, deletePatient } from '../../../actions/index';

interface PatientProp {
  auth: AuthState;
  patients: PatientsState;
  fetchPatients: (id: string) => void;
  deletePatient: (id: string, callback: () => void) => void;
}

interface PatientState {
  selectedPatientId: string;
  showDeletePatientModal: boolean;
}

class Patients extends React.Component<PatientProp, PatientState> {
  state = {
    selectedPatientId: '',
    showDeletePatientModal: false,
  };

  showDeletePatientConfirmation = (patientId: string) => {
    this.setState({
      selectedPatientId: patientId,
      showDeletePatientModal: true,
    });
  };

  handleDeletePatient = () => {
    const { deletePatient } = this.props;
    this.setState({ showDeletePatientModal: false }, () => {
      deletePatient(this.state.selectedPatientId, this.deletePatientCallback);
    });
  };

  deletePatientCallback = () => {
    const {
      auth: {
        user: { id },
      },
      fetchPatients,
    } = this.props;
    fetchPatients(id);
  };

  render() {
    const { patients } = this.props;

    return (
      <React.Fragment>
        {patients.patientActions.isFetching ? (
          <Loader active>Loading your Patients...</Loader>
        ) : patients.patientActions.isDeleting ? (
          <Loader active>Deleting...</Loader>
        ) : (
          <React.Fragment>
            <Button
              icon
              labelPosition='left'
              positive
              as={Link}
              to='/add-patient'>
              Add New Patient
              <Icon name='add' />
            </Button>
            <Table color='blue' celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Age</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Gender</Table.HeaderCell>
                  <Table.HeaderCell width={4}>City</Table.HeaderCell>
                  <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {patients.patients.map(patient => (
                  <Table.Row key={patient.id}>
                    <Table.Cell>{patient.name}</Table.Cell>
                    <Table.Cell>{patient.age}</Table.Cell>
                    <Table.Cell>{patient.gender}</Table.Cell>
                    <Table.Cell>{patient.address.city}</Table.Cell>
                    <Table.Cell>
                      <Button icon>
                        <Icon name='angle right' />
                      </Button>
                      <Button icon>
                        <Icon name='edit' />
                      </Button>
                      <Button
                        icon
                        onClick={() =>
                          this.showDeletePatientConfirmation(patient.id)
                        }>
                        <Icon name='delete' />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {patients.patients.length === 0 ? (
              <Message warning>
                <Message.Header>Oops!</Message.Header>
                <p>No patient records found</p>
              </Message>
            ) : null}
            {patients.patientActions.error ? (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{patients.patientActions.error}</p>
              </Message>
            ) : null}
          </React.Fragment>
        )}
        <Confirm
          open={this.state.showDeletePatientModal}
          onCancel={() => this.setState({ showDeletePatientModal: false })}
          onConfirm={this.handleDeletePatient}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    patients: state.patients,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPatients: (id: string) => {
      dispatch(fetchPatients(id));
    },
    deletePatient: (id: string, callback: () => void) => {
      dispatch(deletePatient(id, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
