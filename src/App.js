import React from 'react';
import './app.css';

import CustomButton from './components/CustomButton/CustomButton';
import CustomInput from './components/CustomInput/CustomInput';

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <CustomInput type='text' placeholder='Enter name' />
      <CustomButton label='Test' onClick={() => console.log('Fuck')} />
    </div>
  );
};

export default App;
