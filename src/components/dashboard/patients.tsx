import React from 'react';
import { connect } from 'react-redux';
import { Loader, Table, Button, Icon } from 'semantic-ui-react';

import { PatientsState } from '../../reducers/patients';

interface PatientState {
  patients: PatientsState;
}

class Patients extends React.Component<PatientState> {
  render() {
    const { patients } = this.props;

    return (
      <React.Fragment>
        {patients.patientActions.isFetching ? (
          <Loader active>Loading your Patients...</Loader>
        ) : (
          <React.Fragment>
            <Button icon labelPosition='left' positive>
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
                      <Button icon>
                        <Icon name='delete' />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </React.Fragment>
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

export default connect(mapStateToProps)(Patients);
