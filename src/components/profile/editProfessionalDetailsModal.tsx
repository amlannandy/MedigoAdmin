import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'semantic-ui-react';

import { AuthState } from '../../reducers/auth';
import { reloadUser, updateUser } from '../../actions/index';

interface EditProfessionalDetailsProps {
  auth: AuthState;
  isOpen: boolean;
  reloadUser: () => void;
  closeModal: () => void;
  updateUser: (id: string, data: any, callback: () => void) => void;
}

interface EditProfessionalDetailsState {
  hospital: string;
  field: string;
  experience: string;
  city: string;
  errors: {
    hosptial: string;
    field: string;
    experience: string;
    city: string;
    isFormValid: boolean;
  };
}

class EditProfessionalDetailsModal extends React.Component<
  EditProfessionalDetailsProps,
  EditProfessionalDetailsState
> {
  constructor(props) {
    super(props);
    const { auth } = props;
    const {
      user: { hospital, field, experience, city },
    } = auth as AuthState;
    this.state = {
      hospital,
      field,
      experience: experience.toString(),
      city,
      errors: {
        hosptial: '',
        field: '',
        experience: '',
        city: '',
        isFormValid: true,
      },
    };
  }

  validateForm = () => {
    const { hospital, field, experience, city } = this.state;
    let hospitalError = '',
      fieldError = '',
      experienceError = '',
      cityError = '';
    let isFormValid = false;
    if (hospital.trim().length === 0) {
      hospitalError = 'Please provide a hospital name';
    }
    if (field.trim().length === 0) {
      fieldError = 'Please provide your field';
    }
    if (experience.trim().length === 0) {
      experienceError = 'Please provide your experience';
    }
    if (city.trim().length === 0) {
      cityError = 'Please provide your city';
    }
    if (!hospitalError && !fieldError && !experienceError && !cityError) {
      isFormValid = true;
    }
    this.setState({
      errors: {
        hosptial: hospitalError,
        experience: experienceError,
        city: cityError,
        field: fieldError,
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

  handleUpdateDetails = () => {
    const {
      updateUser,
      auth: { user },
    } = this.props;
    const { hospital, field, city, experience } = this.state;
    const data = { hospital, field, city, experience: parseInt(experience) };
    updateUser(user.id, data, this.updateCallback);
  };

  updateCallback = () => {
    const { reloadUser, closeModal } = this.props;
    reloadUser();
    closeModal();
  };

  render() {
    const {
      closeModal,
      isOpen,
      auth: {
        authActions: { isUpdating },
      },
    } = this.props;
    const { hospital, field, city, experience, errors } = this.state;

    return (
      <Modal onClose={closeModal} open={isOpen}>
        <Modal.Header>Update Info</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              fluid
              name='field'
              value={field}
              error={errors.field ? errors.field : null}
              icon='users'
              iconPosition='left'
              placeholder='Field of Practice'
              onChange={this.handleOnChange}
              disabled={isUpdating}
            />
            <Form.Group widths='equal'>
              <Form.Input
                name='hospital'
                value={hospital}
                error={errors.hosptial ? errors.hosptial : null}
                icon='hospital'
                iconPosition='left'
                placeholder='Hospital'
                onChange={this.handleOnChange}
                disabled={isUpdating}
              />
              <Form.Input
                name='city'
                value={city}
                error={errors.city ? errors.city : null}
                icon='home'
                iconPosition='left'
                placeholder='City'
                onChange={this.handleOnChange}
                disabled={isUpdating}
              />
            </Form.Group>
            <Form.Input
              name='experience'
              type='number'
              value={experience}
              error={errors.experience ? errors.experience : null}
              icon='time'
              iconPosition='left'
              placeholder='Years of Experience'
              onChange={this.handleOnChange}
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
            onClick={this.handleUpdateDetails}
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
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    reloadUser: () => {
      return dispatch(reloadUser());
    },
    updateUser: (id: string, data: any, callback: Function) => {
      return dispatch(updateUser(id, data, callback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfessionalDetailsModal);
