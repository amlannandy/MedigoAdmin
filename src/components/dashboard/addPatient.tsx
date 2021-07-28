import React from 'react';
import './css/addPatient.css';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {
  Loader,
  Step,
  Icon,
  Form,
  Segment,
  Button,
  Dropdown,
  Divider,
} from 'semantic-ui-react';

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
  step: number;
}

const genderOptions = [
  { key: 'male', text: 'Male', value: 'male', icon: 'mars' },
  { key: 'female', text: 'Female', value: 'female', icon: 'venus' },
  { key: 'other', text: 'Other', value: 'other', icon: 'venus mars' },
];

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
    step: 1,
  };

  handleOnChange = () => {};

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
            <Step.Group size='small'>
              <Step
                active={this.state.step === 1}
                completed={this.state.step > 1}>
                <Icon name='user' />
                <Step.Content>
                  <Step.Title>Step 1</Step.Title>
                  <Step.Description>Basic Information</Step.Description>
                </Step.Content>
              </Step>
              <Step
                active={this.state.step === 2}
                completed={this.state.step > 2}>
                <Icon name='home' />
                <Step.Content>
                  <Step.Title>Step 2</Step.Title>
                  <Step.Description>Address & Location</Step.Description>
                </Step.Content>
              </Step>
              <Step
                active={this.state.step === 3}
                completed={this.state.step > 3}>
                <Icon name='hospital' />
                <Step.Content>
                  <Step.Title>Step 3</Step.Title>
                  <Step.Description>Health Information</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
            <Form>
              {this.state.step === 1 ? (
                <Segment>
                  <strong>
                    Please provide basic information about the patient
                  </strong>
                  <Divider />
                  <Form.Input
                    name='firstName'
                    value={this.state.firstName}
                    //error={this.state.emailError ? this.state.emailError : null}
                    icon='user'
                    iconPosition='left'
                    placeholder='First Name'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='lastName'
                    value={this.state.lastName}
                    //error={this.state.emailError ? this.state.emailError : null}
                    icon='user outline'
                    iconPosition='left'
                    placeholder='Last Name'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='age'
                    value={this.state.age}
                    type='number'
                    //error={this.state.emailError ? this.state.emailError : null}
                    icon='numbered list'
                    iconPosition='left'
                    placeholder='Age'
                    onChange={this.handleOnChange}
                  />
                  <Dropdown
                    fluid
                    className='custom-dropdown'
                    placeholder='Select Gender'
                    selection
                    options={genderOptions}
                  />
                  <Segment.Inline>
                    <Button icon negative labelPosition='left'>
                      Cancel
                      <Icon name='cancel' />
                    </Button>
                    <Button floated='right' icon primary labelPosition='right'>
                      Next
                      <Icon name='angle right' />
                    </Button>
                  </Segment.Inline>
                </Segment>
              ) : this.state.step === 2 ? (
                <Segment>
                  <strong>
                    Please provide residential details of the patient
                  </strong>
                  <Divider />
                  <Form.Input
                    name='firstName'
                    value={this.state.firstName}
                    //error={this.state.emailError ? this.state.emailError : null}
                    icon='user'
                    iconPosition='left'
                    placeholder='First Name'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='lastName'
                    value={this.state.lastName}
                    //error={this.state.emailError ? this.state.emailError : null}
                    icon='user outline'
                    iconPosition='left'
                    placeholder='Last Name'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='age'
                    value={this.state.age}
                    type='number'
                    //error={this.state.emailError ? this.state.emailError : null}
                    icon='numbered list'
                    iconPosition='left'
                    placeholder='Age'
                    onChange={this.handleOnChange}
                  />
                  <Dropdown
                    fluid
                    className='custom-dropdown'
                    placeholder='Select Gender'
                    selection
                    options={genderOptions}
                  />
                  <Segment.Inline>
                    <Button icon primary labelPosition='left'>
                      Previous
                      <Icon name='angle left' />
                    </Button>
                    <Button floated='right' icon primary labelPosition='right'>
                      Next
                      <Icon name='angle right' />
                    </Button>
                  </Segment.Inline>
                </Segment>
              ) : (
                <Segment>
                  <strong>
                    Please provide basic health information about the patient
                  </strong>
                  <Divider />
                  <Form.Input
                    name='firstName'
                    value={this.state.firstName}
                    //error={this.state.emailError ? this.state.emailError : null}
                    icon='user'
                    iconPosition='left'
                    placeholder='First Name'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='lastName'
                    value={this.state.lastName}
                    //error={this.state.emailError ? this.state.emailError : null}
                    icon='user outline'
                    iconPosition='left'
                    placeholder='Last Name'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='age'
                    value={this.state.age}
                    type='number'
                    //error={this.state.emailError ? this.state.emailError : null}
                    icon='numbered list'
                    iconPosition='left'
                    placeholder='Age'
                    onChange={this.handleOnChange}
                  />
                  <Dropdown
                    fluid
                    className='custom-dropdown'
                    placeholder='Select Gender'
                    selection
                    options={genderOptions}
                  />
                  <Segment.Inline>
                    <Button icon primary labelPosition='left'>
                      Previous
                      <Icon name='angle left' />
                    </Button>
                    <Button floated='right' icon positive labelPosition='right'>
                      Save Record
                      <Icon name='save' />
                    </Button>
                  </Segment.Inline>
                </Segment>
              )}
            </Form>
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
