import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'semantic-ui-react';

import { ClinicState } from '../../../reducers/clinic';
import { isEmail, isMobilePhone } from '../../../utils/helpers';
import { updateClinicDetails, fetchClinic } from '../../../actions/index';

interface UpdateClinicDetailsModalProps {
  clinic: ClinicState;
  fetchClinic: (id: string) => void;
  updateClinicDetails: (
    clinicId: string,
    data: any,
    callback: () => void
  ) => void;
  isOpen: boolean;
  closeModal: () => void;
}

interface UpdateClinicDetailsModalState {
  name: string;
  phone: string;
  email: string;
  address: string;
  errors: {
    nameError: string;
    phoneError: string;
    emailError: string;
    addressError: string;
    isFormValid: boolean;
  };
}

class UpdateClinicDetailsModal extends React.Component<
  UpdateClinicDetailsModalProps,
  UpdateClinicDetailsModalState
> {
  constructor(props: UpdateClinicDetailsModalProps) {
    super(props);
    const {
      clinic: {
        clinic: { name, phone, email, address },
      },
    } = props;
    this.state = {
      name,
      phone,
      email,
      address,
      errors: {
        nameError: '',
        phoneError: '',
        emailError: '',
        addressError: '',
        isFormValid: true,
      },
    };
  }

  validateForm = () => {
    const { name, email, phone, address } = this.state;
    let nameError = '',
      emailError = '',
      phoneError = '',
      addressError = '';
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
    if (!nameError && !emailError && !phoneError && !addressError) {
      isFormValid = true;
    }
    this.setState({
      errors: {
        nameError,
        emailError,
        phoneError,
        addressError,
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

  handleUpdateClinicDetails = () => {
    const {
      updateClinicDetails,
      clinic: {
        clinic: { id },
      },
    } = this.props;
    const { name, phone, email, address } = this.state;
    const data = {
      name,
      phone,
      email,
      address,
    };
    updateClinicDetails(id, data, this.updateClinicCallback);
  };

  updateClinicCallback = () => {
    const { closeModal, fetchClinic, clinic } = this.props;
    closeModal();
    fetchClinic(clinic.clinic.id);
  };

  render() {
    const {
      clinic: {
        clinicActions: { isUpdating },
      },
      isOpen,
      closeModal,
    } = this.props;
    const { name, phone, email, address, errors } = this.state;

    return (
      <Modal onClose={closeModal} open={isOpen}>
        <Modal.Header>Update Clinic Details</Modal.Header>

        <Modal.Content>
          <Form>
            <Form.Input
              fluid
              name='name'
              value={name}
              error={errors.nameError ? errors.nameError : null}
              icon='hospital'
              iconPosition='left'
              placeholder='Name'
              onChange={this.handleOnChange}
              disabled={isUpdating}
            />
            <Form.Group widths='equal'>
              <Form.Input
                name='phone'
                value={phone}
                error={errors.phoneError ? errors.phoneError : null}
                icon='phone'
                iconPosition='left'
                placeholder='Phone Number'
                onChange={this.handleOnChange}
                disabled={isUpdating}
              />
              <Form.Input
                name='email'
                value={email}
                error={errors.emailError ? errors.emailError : null}
                icon='mail'
                iconPosition='left'
                placeholder='Email Address'
                onChange={this.handleOnChange}
                disabled={isUpdating}
              />
            </Form.Group>
            <Form.TextArea
              icon='home'
              name='address'
              value={address}
              onChange={this.handleOnChange}
              placeholder='Clinic Address'
              error={errors.addressError ? errors.addressError : null}
              disabled={isUpdating}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content='Cancel'
            negative
            icon='cancel'
            labelPosition='right'
            onClick={closeModal}
            disabled={isUpdating}
          />
          <Button
            content='Save'
            labelPosition='right'
            icon='checkmark'
            onClick={this.handleUpdateClinicDetails}
            positive
            disabled={!errors.isFormValid || isUpdating}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    clinic: state.clinic,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchClinic: (id: string) => {
      return dispatch(fetchClinic(id));
    },
    updateClinicDetails: (id: string, data: any, callback: Function) => {
      return dispatch(updateClinicDetails(id, data, callback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateClinicDetailsModal);
