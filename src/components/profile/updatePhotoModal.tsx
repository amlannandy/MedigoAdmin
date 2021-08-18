import React from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Input, Button } from 'semantic-ui-react';

import './css/updatePhotoModal.css';
import { AuthState } from '../../reducers/auth';
import Placeholder from '../../static/placeholder.jpg';
import { reloadUser, updatePhoto } from '../../actions/index';

interface UpdatePhotoProps {
  auth: AuthState;
  isOpen: boolean;
  closeModal: () => void;
  reloadUser: () => void;
  updatePhoto: (id: string, file: any, callback: Function) => void;
}

interface UpdatePhotoState {
  image: any;
  imageUrl: string;
}

class UpdatePhotoModal extends React.Component<
  UpdatePhotoProps,
  UpdatePhotoState
> {
  state = {
    image: null,
    imageUrl: null,
  };

  handleImageInput = (e: any) => {
    const image = e.target.files[0];
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ image, imageUrl });
  };

  handleUpdatePhoto = () => {
    const {
      updatePhoto,
      auth: { user },
    } = this.props;
    const { image } = this.state;
    updatePhoto(user.id, image, this.updatePhotoCallback);
  };

  updatePhotoCallback = () => {
    const { closeModal, reloadUser } = this.props;
    closeModal();
    reloadUser();
  };

  render() {
    const {
      auth: { authActions },
      isOpen,
      closeModal,
    } = this.props;
    const { image, imageUrl } = this.state;

    return (
      <Modal onClose={closeModal} open={isOpen}>
        <Modal.Header>Update Profile Picture</Modal.Header>
        <Modal.Content image>
          <img
            className='custom-image'
            alt='user'
            src={imageUrl ? imageUrl : Placeholder}
          />
          <Modal.Description>
            <Header>Select a Image</Header>
            <p>Select a new profile picture</p>
            <p>Please make sure it's clear and displays your face</p>
            <Input
              name='image'
              type='file'
              onChange={this.handleImageInput}
              disabled={authActions.isUpdating}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content='Cancel'
            negative
            icon='cancel'
            labelPosition='right'
            onClick={closeModal}
            disabled={authActions.isUpdating}
          />
          <Button
            content='Save'
            labelPosition='right'
            icon='checkmark'
            onClick={this.handleUpdatePhoto}
            positive
            disabled={(image ? false : true) || authActions.isUpdating}
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
    updatePhoto: (id: string, image: any, callback: Function) => {
      return dispatch(updatePhoto(id, image, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePhotoModal);
