import React from 'react';
import { connect } from 'react-redux';
import './css/updateClinicPhotoModal.css';
import { Modal, Header, Button, Input } from 'semantic-ui-react';

import { ClinicState } from '../../reducers/clinic';
import Placeholder from '../../static/placeholder.jpg';
import { updateClinicPhoto, fetchClinic } from '../../actions/index';

interface UpdateClinicPhotoModalProps {
  clinic: ClinicState;
  fetchClinic: (id: string) => void;
  updateClinicPhoto: (
    clinicId: string,
    doctorId: string,
    imageFile: any,
    callback: () => void
  ) => void;
  isOpen: boolean;
  closeModal: () => void;
}

interface UpdateClinicPhotoModalState {
  image: any;
  imageUrl: string;
}

class UpdateClinicPhotoModal extends React.Component<
  UpdateClinicPhotoModalProps,
  UpdateClinicPhotoModalState
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

  handleUpdateClinicPhoto = () => {
    const {
      updateClinicPhoto,
      clinic: {
        clinic: { id, doctorId },
      },
    } = this.props;
    const { image } = this.state;
    updateClinicPhoto(id, doctorId, image, this.updateClinicCallback);
  };

  updateClinicCallback = () => {
    const { closeModal, fetchClinic, clinic } = this.props;
    closeModal();
    fetchClinic(clinic.clinic.id);
  };

  render() {
    const { clinic, isOpen, closeModal } = this.props;
    const { image, imageUrl } = this.state;

    return (
      <Modal onClose={closeModal} open={isOpen}>
        <Modal.Header>Update Clinic Photo</Modal.Header>
        <Modal.Content image>
          <img
            className='custom-image'
            src={imageUrl ? imageUrl : Placeholder}
          />
          <Modal.Description>
            <Header>Select a Image</Header>
            <p>Select a new image of your Clinic</p>
            <p>Please make sure it's clear and display the clinic name</p>
            <Input
              name='image'
              type='file'
              onChange={this.handleImageInput}
              disabled={clinic.clinicActions.isUpdating}
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
            disabled={clinic.clinicActions.isUpdating}
          />
          <Button
            content='Save'
            labelPosition='right'
            icon='checkmark'
            onClick={this.handleUpdateClinicPhoto}
            positive
            disabled={(image ? false : true) || clinic.clinicActions.isUpdating}
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
    updateClinicPhoto: (
      clinicId: string,
      doctorId: string,
      imageFile: any,
      callback: Function
    ) => {
      return dispatch(
        updateClinicPhoto(clinicId, doctorId, imageFile, callback)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateClinicPhotoModal);
