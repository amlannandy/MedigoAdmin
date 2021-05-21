import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardTab = ({ url }) => {
  const { user } = useSelector(state => state.auth);

  let clinicClasses = 'dashboard-tab';
  if (url.startsWith('/clinic')) {
    clinicClasses += ' dashboard-tab-active';
  }

  let patientsClasses = 'dashboard-tab';
  if (url.startsWith('/patients')) {
    patientsClasses += ' dashboard-tab-active';
  }

  let appointmentsClasses = 'dashboard-tab';
  if (url.startsWith('/appointments')) {
    appointmentsClasses += ' dashboard-tab-active';
  }

  return (
    <div className='dashboard-tab-container'>
      <Link
        className={clinicClasses}
        to={user ? `/clinic/${user.clinicId}` : ''}>
        <div className='text-content'>
          <h3>Clinic</h3>
          <p>Manage your practice</p>
        </div>
        <i className='fas fa-hospital fa-3x'></i>
      </Link>
      <Link className={appointmentsClasses} to='/appointments'>
        <div className='text-content'>
          <h3>Appointments</h3>
          <p>Check upcoming sessions</p>
        </div>
        <i className='fas fa-calendar-week fa-3x'></i>
      </Link>
      <Link className={patientsClasses} to={user ? `/patients/${user.id}` : ''}>
        <div className='text-content'>
          <h3>Patients</h3>
          <p>Check patient records</p>
        </div>
        <i className='fas fa-user fa-3x'></i>
      </Link>
    </div>
  );
};

export default DashboardTab;
