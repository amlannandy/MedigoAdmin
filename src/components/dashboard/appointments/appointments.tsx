import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Icon,
  Input,
  Loader,
  Menu,
  Table,
  Message,
  Confirm,
} from 'semantic-ui-react';

import './css/appointments.css';
import { AuthState } from '../../../reducers/auth';
import { getDates, getEndTime } from '../../../utils/helpers';
import { AppointmentsState } from '../../../reducers/appointments';
import {
  fetchAppointments,
  createAppointment,
  deleteAppointment,
} from '../../../actions/index';

const dates = getDates();

interface ComponentProps {
  auth: AuthState;
  appointments: AppointmentsState;
  fetchAppointments: (id: string, date: string) => void;
  createAppointment: (
    doctorId: string,
    date: string,
    startTime: string,
    endTime: string,
    successCallback: Function
  ) => void;
  deleteAppointment: (id: string, successCallback: Function) => void;
}

interface ComponentState {
  activeDate: string;
  startTime: string;
  endTime: string;
  isDeleteModalOpen: boolean;
  selectedAppointmentId: string;
}

class Appointments extends React.Component<ComponentProps, ComponentState> {
  state = {
    activeDate: dates[0],
    startTime: null,
    endTime: null,
    isDeleteModalOpen: false,
    selectedAppointmentId: null,
  };

  componentDidMount() {
    const {
      auth: {
        user: { id },
      },
      fetchAppointments,
    } = this.props;
    fetchAppointments(id, dates[0]);
  }

  handleItemClick = (e: any, { name }) => {
    this.setState({ activeDate: name }, () => {
      const {
        auth: {
          user: { id },
        },
        fetchAppointments,
      } = this.props;
      fetchAppointments(id, this.state.activeDate);
    });
  };

  selectTime = (e: any, { value: startTime }) => {
    const endTime = getEndTime(startTime);
    this.setState({ startTime, endTime });
  };

  handleCreateAppointment = () => {
    const { activeDate, startTime, endTime } = this.state;
    const {
      auth: {
        user: { id },
      },
      createAppointment,
    } = this.props;
    createAppointment(
      id,
      activeDate,
      startTime,
      endTime,
      this.createAppointmentCallback
    );
  };

  handleDeleteAppointment = () => {
    const { deleteAppointment } = this.props;
    const { selectedAppointmentId } = this.state;
    deleteAppointment(selectedAppointmentId, this.deleteAppointmentCallback);
  };

  createAppointmentCallback = (date: string) => {
    const {
      auth: {
        user: { id },
      },
      fetchAppointments,
    } = this.props;
    fetchAppointments(id, date);
    this.setState({ activeDate: date, startTime: null, endTime: null });
  };

  deleteAppointmentCallback = () => {
    const {
      auth: {
        user: { id },
      },
      fetchAppointments,
    } = this.props;
    this.setState({ isDeleteModalOpen: false });
    fetchAppointments(id, this.state.activeDate);
  };

  render() {
    const {
      appointments: {
        appointments,
        appointmentActions: { isCreating, isFetching },
      },
    } = this.props;
    const { activeDate, startTime, endTime, isDeleteModalOpen } = this.state;

    return (
      <React.Fragment>
        <React.Fragment>
          <Grid>
            <Grid.Row>
              <Input
                name='time'
                className='mr-5'
                type='time'
                value={startTime}
                onChange={this.selectTime}
              />
              <span className='mr-5'>_</span>
              <Input
                disabled
                name='time'
                className='mr-5'
                type='time'
                value={endTime}
                onChange={this.selectTime}
              />
              <Button
                icon
                labelPosition='right'
                positive
                onClick={this.handleCreateAppointment}
                disabled={!startTime || !endTime || isCreating}>
                <Icon name='plus' /> Add New Slot
              </Button>
            </Grid.Row>
          </Grid>
          <Menu tabular>
            {dates.map(date => (
              <Menu.Item
                key={date}
                name={date}
                content={date}
                active={activeDate === date}
                onClick={this.handleItemClick}
              />
            ))}
          </Menu>
          {isFetching && (
            <Loader
              active
              inline='centered'
              className='loader'
              content='Fetching appointments...'
            />
          )}
          {isCreating && (
            <Loader
              active
              inline='centered'
              className='loader'
              content='Creating slot...'
            />
          )}
          {!isCreating && !isFetching && appointments.length !== 0 && (
            <Table color='green' celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Timing</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                  <Table.HeaderCell width={3}>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {appointments.map(appointment => (
                  <Table.Row key={appointment.id}>
                    <Table.Cell>{appointment.time}</Table.Cell>
                    <Table.Cell
                      positive={!appointment.isBooked}
                      negative={appointment.isBooked}>
                      {appointment.isBooked ? 'Booked' : 'Open'}
                    </Table.Cell>
                    <Table.Cell>
                      <Button icon>
                        <Icon name='angle right' />
                      </Button>
                      <Button
                        negative
                        icon
                        disabled={appointment.isBooked}
                        onClick={() =>
                          this.setState({
                            selectedAppointmentId: appointment.id,
                            isDeleteModalOpen: true,
                          })
                        }>
                        <Icon name='delete' />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
          {!isFetching && !isCreating && appointments.length === 0 && (
            <Message warning>
              <Message.Header>Oops!</Message.Header>
              <p>No appointments found for this day</p>
            </Message>
          )}
        </React.Fragment>
        <Confirm
          open={isDeleteModalOpen}
          onCancel={() => this.setState({ isDeleteModalOpen: false })}
          onConfirm={this.handleDeleteAppointment}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    appointments: state.appointments,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchAppointments: (id: string, date: string) => {
      return dispatch(fetchAppointments(id, date));
    },
    createAppointment: (
      doctorId: string,
      date: string,
      startTime: string,
      endTime: string,
      successCallback: Function
    ) => {
      return dispatch(
        createAppointment(doctorId, date, startTime, endTime, successCallback)
      );
    },
    deleteAppointment: (id: string, callback: Function) => {
      return dispatch(deleteAppointment(id, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
