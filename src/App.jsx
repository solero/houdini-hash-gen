import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import GeneratorContainer from './components/GeneratorContainer.jsx';

ReactDOM.render(
  <div className='App'>
    <GeneratorContainer />
  </div>,
  document.getElementById('root')
);
