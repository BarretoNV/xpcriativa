import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes.js';

import './global.scss';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
