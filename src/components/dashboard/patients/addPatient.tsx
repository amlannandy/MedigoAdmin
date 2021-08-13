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
  Checkbox,
} from 'semantic-ui-react';

import { AuthState } from '../../../reducers/auth';
import { fetchPatients, addPatient } from '../../../actions/index';
import { PatientState, PatientsState } from '../../../reducers/patients';

interface AddPatientProps extends RouteComponentProps<any> {
  auth: AuthState;
  patients: PatientsState;
  fetchPatients: (id: string) => void;
  addPatient: (data: PatientState, callback: () => void) => void;
}

interface AddPatientState {
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  line1Address: string;
  line2Address: string;
  city: string;
  pincode: string;
  height: string;
  weight: string;
  isDiabetic: boolean;
  step: number;
  errors: {
    firstName: string;
    lastName: string;
    gender: string;
    age: string;
    line1Address: string;
    line2Address: string;
    city: string;
    pincode: string;
    height: string;
    weight: string;
  };
  validations: {
    isStep1Valid: boolean;
    isStep2Valid: boolean;
    isStep3Valid: boolean;
  };
}

const genderOptions = [
  { key: 'male', text: 'Male', value: 'male', icon: 'mars' },
  { key: 'female', text: 'Female', value: 'female', icon: 'venus' },
  { key: 'other', text: 'Other', value: 'other', icon: 'venus mars' },
];

class AddPatient extends React.Component<AddPatientProps, AddPatientState> {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    line1Address: '',
    line2Address: '',
    city: '',
    pincode: '',
    height: '',
    weight: '',
    isDiabetic: false,
    errors: {
      firstName: '',
      lastName: '',
      gender: '',
      age: '',
      line1Address: '',
      line2Address: '',
      city: '',
      pincode: '',
      height: '',
      weight: '',
    },
    validations: {
      isStep1Valid: false,
      isStep2Valid: false,
      isStep3Valid: false,
    },
  };

  handleOnChange = (e: any) => {
    const newState = { [e.target.name]: e.target.value } as any;
    this.setState(
      {
        ...newState,
      },
      () => {
        if (this.state.step === 1) {
          this.validateStep1();
        } else if (this.state.step === 2) {
          this.validateStep2();
        } else if (this.state.step === 3) {
          this.validateStep3();
        }
      }
    );
  };

  handleDropdownChange = (e: any, { name, value }) => {
    const newState = { [name]: value } as Pick<
      AddPatientState,
      keyof AddPatientState
    >;
    this.setState({ ...newState }, () => {
      if (this.state.step === 1) {
        this.validateStep1();
      } else if (this.state.step === 2) {
        this.validateStep2();
      } else if (this.state.step === 3) {
        this.validateStep3();
      }
    });
  };

  handleCheckboxChange = () => {
    const isDiabetic = this.state.isDiabetic;
    this.setState({ isDiabetic });
  };

  validateStep1 = () => {
    const { firstName, lastName, gender, age } = this.state;
    let firstNameError = '',
      lastNameError = '',
      ageError = '',
      genderError = '';
    let isStep1Valid = false;
    if (firstName.trim().length === 0) {
      firstNameError = 'Please provide a first name';
    }
    if (lastName.trim().length === 0) {
      lastNameError = 'Please provide a last name';
    }
    if (age.trim().length === 0) {
      ageError = 'Please provide an age';
    }
    if (gender.trim().length === 0) {
      genderError = 'Please select a gender';
    }
    if (!firstNameError && !lastNameError && !ageError && !genderError) {
      isStep1Valid = true;
    }
    this.setState({
      errors: {
        ...this.state.errors,
        firstName: firstNameError,
        lastName: lastNameError,
        age: ageError,
        gender: genderError,
      },
      validations: {
        ...this.state.validations,
        isStep1Valid,
      },
    });
  };

  validateStep2 = () => {
    const { line1Address, line2Address, city, pincode } = this.state;
    let line1Error = '',
      line2Error = '',
      cityError = '',
      pincodeError = '';
    let isStep2Valid = false;
    if (line1Address.trim().length === 0) {
      line1Error = 'Please provide line 1 address';
    }
    if (line2Address.trim().length === 0) {
      line2Error = 'Please provide line 2 address';
    }
    if (city.trim().length === 0) {
      cityError = 'Please provide city';
    }
    if (pincode.trim().length === 0) {
      pincodeError = 'Please select pincode';
    }
    if (!line1Error && !line2Error && !cityError && !pincodeError) {
      isStep2Valid = true;
    }
    this.setState({
      errors: {
        ...this.state.errors,
        line1Address: line1Error,
        line2Address: line2Error,
        city: cityError,
        pincode: pincodeError,
      },
      validations: {
        ...this.state.validations,
        isStep2Valid,
      },
    });
  };

  validateStep3 = () => {
    const { height, weight } = this.state;
    let heightError = '',
      weightError = '';
    let isStep3Valid = false;
    if (height.trim().length === 0) {
      heightError = 'Please provide your height';
    }
    if (weight.trim().length === 0) {
      weightError = 'Please provide your weight';
    }
    if (!heightError && !weightError) {
      isStep3Valid = true;
    }
    this.setState({
      errors: {
        ...this.state.errors,
        height: heightError,
        weight: weightError,
      },
      validations: {
        ...this.state.validations,
        isStep3Valid,
      },
    });
  };

  handleAddPatient = () => {
    const {
      firstName,
      lastName,
      age,
      gender,
      line1Address,
      line2Address,
      city,
      pincode,
      height,
      weight,
      isDiabetic,
    } = this.state;
    const {
      auth: { user },
      addPatient,
    } = this.props;
    const patient: PatientState = {
      id: null,
      name: `${firstName} ${lastName}`,
      age: parseInt(age),
      gender,
      address: {
        address: `${line1Address}, ${line2Address}`,
        city,
        pincode,
      },
      healthInfo: {
        height: parseInt(height),
        weight: parseInt(weight),
        isDiabetic,
      },
      doctorId: user.id,
    };
    addPatient(patient, this.addPatientCallback);
  };

  addPatientCallback = () => {
    const {
      history,
      auth: { user },
      fetchPatients,
    } = this.props;
    history.goBack();
    fetchPatients(user.id);
  };

  render() {
    const {
      patients: {
        patientActions: { isAdding },
      },
      history,
    } = this.props;
    const { errors, validations } = this.state;

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
                    error={errors.firstName ? errors.firstName : null}
                    icon='user'
                    iconPosition='left'
                    placeholder='First Name'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='lastName'
                    value={this.state.lastName}
                    error={errors.lastName ? errors.lastName : null}
                    icon='user outline'
                    iconPosition='left'
                    placeholder='Last Name'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='age'
                    value={this.state.age}
                    type='number'
                    error={errors.age ? errors.age : null}
                    icon='numbered list'
                    iconPosition='left'
                    placeholder='Age'
                    onChange={this.handleOnChange}
                  />
                  <Dropdown
                    fluid
                    name='gender'
                    className='custom-dropdown'
                    placeholder='Select Gender'
                    selection
                    options={genderOptions}
                    value={this.state.gender}
                    onChange={this.handleDropdownChange}
                    error={errors.gender ? true : false}
                  />
                  <Segment.Inline>
                    <Button
                      icon
                      negative
                      labelPosition='left'
                      onClick={() => history.goBack()}>
                      Cancel
                      <Icon name='cancel' />
                    </Button>
                    <Button
                      floated='right'
                      icon
                      primary
                      labelPosition='right'
                      disabled={!validations.isStep1Valid}
                      onClick={() => this.setState({ step: 2 })}>
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
                    name='line1Address'
                    value={this.state.line1Address}
                    error={errors.line1Address ? errors.line1Address : null}
                    icon='home'
                    iconPosition='left'
                    placeholder='Line 1 Address'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='line2Address'
                    value={this.state.line2Address}
                    error={errors.line2Address ? errors.line2Address : null}
                    icon='home'
                    iconPosition='left'
                    placeholder='Line 2 Address'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='city'
                    value={this.state.city}
                    error={errors.city ? errors.city : null}
                    icon='pin'
                    iconPosition='left'
                    placeholder='City'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='pincode'
                    value={this.state.pincode}
                    error={errors.pincode ? errors.pincode : null}
                    icon='location arrow'
                    type='number'
                    iconPosition='left'
                    placeholder='Pincode'
                    onChange={this.handleOnChange}
                  />
                  <Segment.Inline>
                    <Button
                      icon
                      primary
                      labelPosition='left'
                      onClick={() => this.setState({ step: 1 })}>
                      Previous
                      <Icon name='angle left' />
                    </Button>
                    <Button
                      floated='right'
                      icon
                      primary
                      labelPosition='right'
                      disabled={!validations.isStep2Valid}
                      onClick={() => this.setState({ step: 3 })}>
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
                    name='height'
                    type='number'
                    value={this.state.height}
                    error={errors.height ? errors.height : null}
                    icon='text height'
                    iconPosition='left'
                    placeholder='Height'
                    onChange={this.handleOnChange}
                  />
                  <Form.Input
                    name='weight'
                    type='number'
                    value={this.state.weight}
                    error={errors.weight ? errors.weight : null}
                    icon='weight'
                    iconPosition='left'
                    placeholder='Weight'
                    onChange={this.handleOnChange}
                  />
                  <Checkbox
                    name='isDiabetic'
                    className='custom-checkbox'
                    label='Patient is diabetic'
                    onChange={this.handleCheckboxChange}
                  />
                  <Segment.Inline>
                    <Button
                      icon
                      primary
                      labelPosition='left'
                      onClick={() => this.setState({ step: 2 })}>
                      Previous
                      <Icon name='angle left' />
                    </Button>
                    <Button
                      floated='right'
                      icon
                      positive
                      labelPosition='right'
                      disabled={!validations.isStep3Valid}
                      onClick={this.handleAddPatient}>
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
    auth: state.auth,
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
