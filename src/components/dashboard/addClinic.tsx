import React from 'react';
import './css/addClinic.css';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Loader, Form, Icon, Message } from 'semantic-ui-react';

import { AuthState } from '../../reducers/auth';
import { addClinic } from '../../actions/index';
import { ClinicState } from '../../reducers/clinic';
import Placeholder from '../../static/placeholder.jpg';
import { isEmail, isMobilePhone } from '../../utils/helpers';

interface AddClinicProps extends RouteComponentProps<any> {
  auth: AuthState;
  clinic: ClinicState;
  addClinic: (data: any, imageFile: any, callback: Function) => void;
}

interface AddClinicState {
  name: string;
  email: string;
  phone: string;
  address: string;
  image: any;
  imageUrl: string;
  errors: {
    nameError: string;
    emailError: string;
    phoneError: string;
    imageError: string;
    addressError: string;
    isFormValid: boolean;
  };
}

class AddClinic extends React.Component<AddClinicProps, AddClinicState> {
  state = {
    name: '',
    email: '',
    phone: '',
    address: '',
    image: null,
    imageUrl: null,
    errors: {
      nameError: '',
      emailError: '',
      phoneError: '',
      imageError: '',
      addressError: '',
      isFormValid: false,
    },
  };

  validateForm = () => {
    const { name, email, phone, address, image } = this.state;
    let nameError = '',
      emailError = '',
      phoneError = '',
      addressError = '',
      imageError = '';
    let isFormValid = false;
    if (name.trim().length === 0) {
      nameError = 'Please provide a name';
    }
    if (!isEmail(email)) {
      emailError = 'Please provide a valid email';
    }
    if (!isMobilePhone(phone)) {
      phoneError = 'Please provide a valid phone number';
    }
    if (address.trim().length === 0) {
      addressError = 'Please provide an address';
    }
    if (!image) {
      imageError = 'Please upload a picture of the clinic';
    }
    if (
      !nameError &&
      !emailError &&
      !phoneError &&
      !addressError &&
      !imageError
    ) {
      isFormValid = true;
    }
    this.setState({
      errors: {
        nameError,
        emailError,
        phoneError,
        addressError,
        imageError,
        isFormValid,
      },
    });
  };

  handleOnChange = (e: any) => {
    const newState = { [e.target.name]: e.target.value } as any;
    this.setState(
      {
        ...newState,
      },
      () => {
        this.validateForm();
      }
    );
  };

  handleImageInput = e => {
    const image = e.target.files[0];
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ image, imageUrl }, () => {
      this.validateForm();
    });
  };

  handleAddClinic = () => {
    const { auth, addClinic } = this.props;
    const { name, email, phone, address, image } = this.state;
    const data = {
      name,
      email,
      phone,
      address,
      doctorId: auth.user.id,
      location: { latitude: 23, longitude: 76 },
    };
    addClinic(data, image, this.addClinicCallback);
  };

  addClinicCallback = () => {
    const { history } = this.props;
    history.replace('/clinic');
  };

  render() {
    const { errors } = this.state;
    const { history, clinic } = this.props;

    return (
      <React.Fragment>
        {clinic.clinicActions.isAdding ? (
          <Loader active>Saving...</Loader>
        ) : (
          <React.Fragment>
            <Message info>
              <Message.Header>Register your Clinic</Message.Header>
              <p>
                We need some details about your clinic. After verification, it
                will be linked to your account
              </p>
            </Message>
            <Form>
              <img
                className='add-clinic-image'
                src={this.state.imageUrl ? this.state.imageUrl : Placeholder}
                alt='clinic'
              />
              <Form.Input
                name='image'
                type='file'
                error={errors.imageError ? errors.imageError : null}
                onChange={this.handleImageInput}
              />
              <Form.Input
                fluid
                name='name'
                value={this.state.name}
                error={errors.nameError ? errors.nameError : null}
                icon='hospital'
                iconPosition='left'
                placeholder='Name'
                onChange={this.handleOnChange}
              />
              <Form.Group widths='equal'>
                <Form.Input
                  name='phone'
                  value={this.state.phone}
                  error={errors.phoneError ? errors.phoneError : null}
                  icon='phone'
                  iconPosition='left'
                  placeholder='Phone Number'
                  onChange={this.handleOnChange}
                />
                <Form.Input
                  name='email'
                  value={this.state.email}
                  error={errors.emailError ? errors.emailError : null}
                  icon='mail'
                  iconPosition='left'
                  placeholder='Email Address'
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.TextArea
                icon='home'
                name='address'
                onChange={this.handleOnChange}
                placeholder='Clinic Address'
                error={errors.addressError ? errors.addressError : null}
              />
              <Form.Group widths='equal'>
                <Form.Button
                  icon
                  negative
                  labelPosition='left'
                  onClick={() => history.replace('/clinic')}>
                  Cancel
                  <Icon name='cancel' />
                </Form.Button>
                <Form.Button
                  icon
                  positive
                  labelPosition='right'
                  floated='right'
                  disabled={!errors.isFormValid}
                  onClick={this.handleAddClinic}>
                  Confirm
                  <Icon name='angle right' />
                </Form.Button>
              </Form.Group>
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
    clinic: state.clinic,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addClinic: (data: any, imageFile: any, callback: Function) => {
      return dispatch(addClinic(data, imageFile, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddClinic);
