import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import {
  Dimmer,
  Loader,
  Step,
  Icon,
  Header,
  Form,
  Divider,
  Button,
  Container,
  Grid,
  Input,
} from 'semantic-ui-react';

import './css/completeProfile.css';
import { AuthState } from '../../reducers/auth';
import { isMobilePhone } from '../../utils/helpers';
import Placeholder from '../../static/placeholder.jpg';
import { logout, completeProfile } from '../../actions/index';

interface CustomProps extends RouteComponentProps<any> {
  auth: AuthState;
  logout: () => void;
  completeProfile: (data: any) => void;
}

interface CustomState {
  step: number;
  form: {
    name: string;
    age: string;
    phone: string;
    city: string;
    field: string;
    hospital: string;
    experience: string;
    image: any;
    imageUrl: string;
    errors: {
      name: string;
      age: string;
      phone: string;
      city: string;
      field: string;
      image: string;
      hospital: string;
      experience: string;
      isStep1Valid: boolean;
      isStep2Valid: boolean;
    };
  };
}

class CompleteProfile extends React.Component<CustomProps, CustomState> {
  state = {
    step: 1,
    form: {
      name: '',
      age: '',
      phone: '',
      city: '',
      field: '',
      hospital: '',
      experience: '',
      image: null,
      imageUrl: '',
      errors: {
        name: null,
        age: null,
        phone: null,
        city: null,
        field: null,
        image: null,
        hospital: null,
        experience: null,
        isStep1Valid: false,
        isStep2Valid: false,
      },
    },
  };

  handleOnChange = (e: any) => {
    const newState = {
      form: { ...this.state.form, [e.target.name]: e.target.value },
    } as any;
    this.setState(
      {
        ...newState,
      },
      () => {
        if (this.state.step === 1) {
          this.validateStep1();
        } else if (this.state.step === 2) {
          this.validateStep2();
        }
      }
    );
  };

  handleImageInput = (e: any) => {
    const image = e.target.files[0];
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({
      form: { ...this.state.form, image, imageUrl },
    });
  };

  validateStep1 = () => {
    const {
      form: { name, age, phone },
    } = this.state;
    let nameError,
      ageError,
      phoneError,
      isStep1Valid = false;
    if (name.trim().length === 0) {
      nameError = 'Please provide your name';
    }
    if (age.trim().length === 0) {
      ageError = 'Please provide your age';
    }
    if (!isMobilePhone(phone)) {
      phoneError = 'Please provide your phone number';
    }
    if (!nameError && !ageError && !phoneError) {
      isStep1Valid = true;
    }
    this.setState({
      form: {
        ...this.state.form,
        errors: {
          ...this.state.form.errors,
          name: nameError,
          age: ageError,
          phone: phoneError,
          isStep1Valid,
        },
      },
    });
  };

  validateStep2 = () => {
    const {
      form: { experience, hospital, city, field },
    } = this.state;
    let experienceError,
      hospitalError,
      cityError,
      fieldError,
      isStep2Valid = false;
    if (experience.trim().length === 0) {
      experienceError = 'Please provide years of experience';
    }
    if (hospital.trim().length === 0) {
      hospitalError = 'Please provide your hospital';
    }
    if (city.trim().length === 0) {
      cityError = 'Please provide your city';
    }
    if (field.trim().length === 0) {
      fieldError = 'Please select your field of work';
    }
    if (!experienceError && !hospitalError && !cityError && !fieldError) {
      isStep2Valid = true;
    }
    this.setState({
      form: {
        ...this.state.form,
        errors: {
          ...this.state.form.errors,
          experience: experienceError,
          hospital: hospitalError,
          city: cityError,
          field: fieldError,
          isStep2Valid,
        },
      },
    });
  };

  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  handleCompleteProfile = () => {
    let form = { ...this.state.form };
    delete form.errors;
    delete form.imageUrl;
    const { completeProfile } = this.props;
    completeProfile(form);
  };

  render() {
    const {
      auth: { user, authActions },
    } = this.props;

    const { form } = this.state;

    if (
      authActions.isInitialized &&
      !authActions.isAuthenticated &&
      !authActions.isLoading
    ) {
      return <Redirect to='/login' />;
    }

    if (user) {
      return <Redirect to='/' />;
    }

    return (
      <React.Fragment>
        {!authActions.isInitialized ||
        authActions.isUpdating ||
        authActions.isLoading ? (
          <Dimmer active>
            <Loader indeterminate>Please wait...</Loader>
          </Dimmer>
        ) : null}
        <Container className='padded'>
          <Header as='h1' color='blue'>
            Complete your Profile
            <Header.Subheader>to start using MediGo</Header.Subheader>
          </Header>
          <Step.Group size='small'>
            <Step
              active={this.state.step === 1}
              completed={this.state.step > 1}>
              <Icon name='user' />
              <Step.Content>
                <Step.Title>Step 1</Step.Title>
                <Step.Description>Basic Details</Step.Description>
              </Step.Content>
            </Step>
            <Step
              active={this.state.step === 2}
              completed={this.state.step > 2}>
              <Icon name='suitcase' />
              <Step.Content>
                <Step.Title>Step 2</Step.Title>
                <Step.Description>Professional Details</Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>
          <Divider />
          <Form>
            {/* Step 1 */}
            {this.state.step === 1 ? (
              <React.Fragment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <img
                        className='custom-image'
                        alt='clinic'
                        src={form.imageUrl ? form.imageUrl : Placeholder}
                      />
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Header as='h5' className='p-1'>
                        <Icon name='user' />
                        Please provide your basic information
                      </Header>
                      <Form.Group>
                        <Form.Input
                          name='name'
                          value={form.name}
                          error={form.errors.name}
                          icon='user'
                          iconPosition='left'
                          placeholder='Name'
                          onChange={this.handleOnChange}
                        />
                        <Form.Input
                          name='age'
                          type='number'
                          value={form.age}
                          error={form.errors.age}
                          icon='numbered list'
                          iconPosition='left'
                          placeholder='Age'
                          onChange={this.handleOnChange}
                        />
                        <Form.Input
                          name='phone'
                          type='number'
                          value={form.phone}
                          error={form.errors.phone}
                          icon='phone'
                          iconPosition='left'
                          placeholder='Phone'
                          onChange={this.handleOnChange}
                        />
                      </Form.Group>
                      <p>Upload your picture</p>
                      <Input
                        name='image'
                        type='file'
                        onChange={this.handleImageInput}
                        disabled={authActions.isUpdating}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <div className='btn-row'>
                  <Button
                    floated='left'
                    icon
                    negative
                    labelPosition='left'
                    onClick={this.handleLogout}>
                    Logout
                    <Icon name='log out' />
                  </Button>
                  <Button
                    floated='right'
                    icon
                    primary
                    labelPosition='right'
                    disabled={!form.errors.isStep1Valid || !form.image}
                    onClick={() => this.setState({ step: 2 })}>
                    Next
                    <Icon name='angle right' />
                  </Button>
                </div>
              </React.Fragment>
            ) : null}
            {this.state.step === 2 ? (
              <React.Fragment>
                <Header as='h5' className='p-1'>
                  <Icon name='suitcase' />
                  Please provide your professional information
                </Header>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <Form.Input
                        name='field'
                        value={form.field}
                        error={form.errors.field}
                        icon='suitcase'
                        iconPosition='left'
                        placeholder='Field of Expertise'
                        onChange={this.handleOnChange}
                      />
                      <Form.Input
                        name='experience'
                        type='number'
                        value={form.experience}
                        error={form.errors.experience}
                        icon='numbered list'
                        iconPosition='left'
                        placeholder='Experience'
                        onChange={this.handleOnChange}
                      />
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Form.Input
                        name='hospital'
                        value={form.hospital}
                        error={form.errors.hospital}
                        icon='hospital'
                        iconPosition='left'
                        placeholder='Name of Hospital'
                        onChange={this.handleOnChange}
                      />
                      <Form.Input
                        name='city'
                        value={form.city}
                        error={form.errors.city}
                        icon='home'
                        iconPosition='left'
                        placeholder='City'
                        onChange={this.handleOnChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <div className='btn-row'>
                  <Button
                    floated='left'
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
                    positive
                    labelPosition='right'
                    disabled={!form.errors.isStep2Valid}
                    onClick={this.handleCompleteProfile}>
                    Submit
                    <Icon name='check circle' />
                  </Button>
                </div>
              </React.Fragment>
            ) : null}
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    logout: () => {
      return dispatch(logout());
    },
    completeProfile: (data: any) => {
      return dispatch(completeProfile(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfile);
