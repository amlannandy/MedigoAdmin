import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface PatientProps extends RouteComponentProps<any> {}

interface PatientState {}

class Patient extends React.Component<PatientProps, PatientState> {
  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    return (
      <div>
        <h1>Patient</h1>
        <p>{id}</p>
      </div>
    );
  }
}

export default Patient;
