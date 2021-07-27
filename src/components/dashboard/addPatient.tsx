import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import { PatientState, PatientsState } from '../../reducers/patients';
import { fetchPatients, addPatient } from '../../actions/index';

interface AddPatientProps extends RouteComponentProps<any> {
  patients: PatientsState;
  fetchPatients: (id: string) => void;
  addPatient: (data: PatientState, callback: () => void) => void;
}

interface AddPatientState {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  line1Address: string;
  line2Address: string;
  city: string;
  pincode: string;
  height: number;
  weight: number;
  isDiabetic: boolean;
}

class AddPatient extends React.Component<AddPatientProps, AddPatientState> {
  state = {
    firstName: '',
    lastName: '',
    gender: '',
    age: null,
    line1Address: '',
    line2Address: '',
    city: '',
    pincode: '',
    height: null,
    weight: null,
    isDiabetic: false,
  };

  render() {
    const {
      patients: {
        patientActions: { isAdding },
      },
    } = this.props;

    return (
      <React.Fragment>
        {isAdding ? (
          <Loader active>Saving patient...</Loader>
        ) : (
          <React.Fragment>
            <h1>Add Patient</h1>
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
    addPatient: (data: PatientState, callback: () => void) => {
      dispatch(addPatient(data, callback));
    },
    fetchPatients: (id: string) => {
      dispatch(fetchPatients(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPatient);
