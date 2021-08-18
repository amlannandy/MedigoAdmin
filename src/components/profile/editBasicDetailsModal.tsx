import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'semantic-ui-react';

import { AuthState } from '../../reducers/auth';
import { reloadUser, updateUser } from '../../actions/index';
import { isEmail, isMobilePhone } from '../../utils/helpers';

interface EditBasicDetailsProps {
  auth: AuthState;
  isOpen: boolean;
  reloadUser: () => void;
  closeModal: () => void;
  updateUser: (id: string, data: any, callback: () => void) => void;
}

interface EditBasicDetailsState {
  name: string;
  email: string;
  phone: string;
  age: string;
  errors: {
    name: string;
    email: string;
    phone: string;
    age: string;
    isFormValid: boolean;
  };
}

class EditBasicDetailsModal extends React.Component<
  EditBasicDetailsProps,
  EditBasicDetailsState
> {
  constructor(props) {
    super(props);
    const { auth } = props;
    const {
      user: { name, email, phone, age },
    } = auth as AuthState;
    this.state = {
      name,
      email,
      phone,
      age: age.toString(),
      errors: {
        name: '',
        email: '',
        phone: '',
        age: '',
        isFormValid: true,
      },
    };
  }

  validateForm = () => {
    const { name, email, phone, age } = this.state;
    let nameError = '',
      emailError = '',
      phoneError = '',
      ageError = '';
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
    if (age.trim().length === 0) {
      ageError = 'Please provide an age';
    }
    if (!nameError && !emailError && !phoneError && !ageError) {
      isFormValid = true;
    }
    this.setState({
      errors: {
        name: nameError,
        email: emailError,
        phone: phoneError,
        age: ageError,
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

  handleUpdateBasicDetails = () => {
    const {
      updateUser,
      auth: { user },
    } = this.props;
    const { name, email, phone, age } = this.state;
    const data = { name, email, phone, age: parseInt(age) };
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
    const { name, email, phone, age, errors } = this.state;

    return (
      <Modal onClose={closeModal} open={isOpen}>
        <Modal.Header>Update Info</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              fluid
              name='name'
              value={name}
              error={errors.name ? errors.name : null}
              icon='user'
              iconPosition='left'
              placeholder='Name'
              onChange={this.handleOnChange}
              disabled={isUpdating}
            />
            <Form.Group widths='equal'>
              <Form.Input
                name='phone'
                value={phone}
                error={errors.phone ? errors.phone : null}
                icon='phone'
                iconPosition='left'
                placeholder='Phone Number'
                onChange={this.handleOnChange}
                disabled={isUpdating}
              />
              <Form.Input
                name='email'
                value={email}
                error={errors.email ? errors.email : null}
                icon='mail'
                iconPosition='left'
                placeholder='Email Address'
                onChange={this.handleOnChange}
                disabled={true}
              />
            </Form.Group>
            <Form.Input
              icon='user outline'
              iconPosition='left'
              name='age'
              type='number'
              value={age}
              onChange={this.handleOnChange}
              placeholder='Age'
              error={errors.age ? errors.age : null}
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
            onClick={this.handleUpdateBasicDetails}
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
)(EditBasicDetailsModal);
