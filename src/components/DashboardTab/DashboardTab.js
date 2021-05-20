import './style.css';
import React from 'react';

const DashboardTab = () => {
  return (
    <div className='dashboard-tab-container'>
      <div className='dashboard-tab clinic-tab'>
        <div className='text-content'>
          <h3>Clinic</h3>
          <p>Manage your practice</p>
        </div>
        <i className='fas fa-hospital fa-3x'></i>
      </div>
      <div className='dashboard-tab appointments-tab'>
        <div className='text-content'>
          <h3>Appointments</h3>
          <p>Check upcoming sessions</p>
        </div>
        <i className='fas fa-calendar-week fa-3x'></i>
      </div>
      <div className='dashboard-tab patients-tab'>
        <div className='text-content'>
          <h3>Patients</h3>
          <p>Check patient records</p>
        </div>
        <i className='fas fa-user fa-3x'></i>
      </div>
    </div>
  );
};

export default DashboardTab;
