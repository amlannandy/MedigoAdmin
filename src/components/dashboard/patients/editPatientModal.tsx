import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'semantic-ui-react';

import { PatientsState } from '../../../reducers/patients';
import { updatePatient } from '../../../actions/index';

interface EditPatientModalProps {
  isOpen: boolean;
  closeModal: () => void;
  patient: PatientsState;
  successCallback: Function;
  updatePatient: (id: string, data: any, callback: Function) => void;
}

interface EditPatientModalState {
  address: string;
  city: string;
  pincode: string;
  errors: {
    addressError: string;
    cityError: string;
    pincodeError: string;
    isFormValid: boolean;
  };
}

class EditPatientModal extends React.Component<
  EditPatientModalProps,
  EditPatientModalState
> {
  constructor(props: EditPatientModalProps) {
    super(props);
    const {
      patient: {
        patient: {
          address: { address, city, pincode },
        },
      },
    } = props;
    this.state = {
      address,
      city,
      pincode,
      errors: {
        addressError: '',
        cityError: '',
        pincodeError: '',
        isFormValid: true,
      },
    };
  }

  validateForm = () => {
    const { address, city, pincode } = this.state;
    let addressError = '',
      cityError = '',
      pincodeError = '';
    let isFormValid = false;
    if (address.trim().length === 0) {
      addressError = 'Please provide an address';
    }
    if (city.trim().length === 0) {
      cityError = 'Please provide a city';
    }
    if (pincode.trim().length === 0) {
      addressError = 'Please provide a pincode';
    }
    if (!addressError && !cityError && !pincodeError) {
      isFormValid = true;
    }
    this.setState({
      errors: {
        addressError,
        cityError,
        pincodeError,
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
      this.validateForm
    );
  };

  handleEditPatient = () => {
    const {
      updatePatient,
      patient: { patient },
      successCallback,
    } = this.props;
    const { address, city, pincode } = this.state;
    const data = {
      address: {
        address,
        city,
        pincode,
      },
    };
    updatePatient(patient.id, data, successCallback);
  };

  render() {
    const {
      patient: {
        patientActions: { isUpdating },
      },
      isOpen,
      closeModal,
    } = this.props;
    const { address, city, pincode, errors } = this.state;

    return (
      <Modal onClose={closeModal} open={isOpen}>
        <Modal.Header>Edit Patient Record</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.TextArea
              icon='home'
              name='address'
              value={address}
              onChange={this.handleOnChange}
              placeholder='Patient Address'
              error={errors.addressError ? errors.addressError : null}
              disabled={isUpdating}
            />
            <Form.Group widths='equal'>
              <Form.Input
                name='city'
                value={city}
                error={errors.cityError ? errors.cityError : null}
                icon='building'
                iconPosition='left'
                placeholder='City'
                onChange={this.handleOnChange}
                disabled={isUpdating}
              />
              <Form.Input
                name='pincode'
                value={pincode}
                error={errors.pincodeError ? errors.pincodeError : null}
                icon='numbered list'
                iconPosition='left'
                placeholder='Pincode'
                onChange={this.handleOnChange}
                disabled={isUpdating}
              />
            </Form.Group>
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
            onClick={this.handleEditPatient}
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
    patient: state.patients,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    updatePatient: (id: string, data: any, callback: Function) => {
      return dispatch(updatePatient(id, data, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPatientModal);
