import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Loader, Message } from 'semantic-ui-react';

import { PatientsState } from '../../../reducers/patients';
import { fetchPatient } from '../../../actions/index';

interface PatientProps extends RouteComponentProps<any> {
  patients: PatientsState;
  fetchPatient: (id: string) => void;
}

class Patient extends React.Component<PatientProps> {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      fetchPatient,
    } = this.props;
    fetchPatient(id);
  }

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
            <h1>{patient.name}</h1>
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

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchPatient: (id: string) => {
      return dispatch(fetchPatient(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
