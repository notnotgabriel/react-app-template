import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const func: Function = () => 1;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
