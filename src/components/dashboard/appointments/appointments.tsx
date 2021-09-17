import React from 'react';
import { connect } from 'react-redux';
import { Menu, Table } from 'semantic-ui-react';

import { getDates } from '../../../utils/helpers';
import { AuthState } from '../../../reducers/auth';
import { fetchAppointments } from '../../../actions/index';
import { AppointmentsState } from '../../../reducers/appointments';

const dates = getDates();

interface ComponentProps {
  auth: AuthState;
  appointments: AppointmentsState;
  fetchAppointments: (id: string, date: string) => void;
}

class Appointments extends React.Component<ComponentProps> {
  state = {
    activeDate: dates[0],
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

  handleItemClick = (e: any, { name }) => this.setState({ activeDate: name });

  render() {
    const { activeDate } = this.state;

    return (
      <React.Fragment>
        <Menu tabular>
          {dates.map(date => (
            <Menu.Item
              key={date}
              name={date}
              content={date}
              active={activeDate === date}
              onClick={this.handleItemClick}></Menu.Item>
          ))}
        </Menu>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
