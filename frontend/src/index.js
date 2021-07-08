import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import { MegaParent } from './sockets';

import './style.css';

ReactDOM.render(
  <MegaParent>
    <App />
  </MegaParent>,
  document.getElementById('root'),
);