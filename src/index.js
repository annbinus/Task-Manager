import React from 'react';
import ReactDOM from 'react-dom/client';

import AppMain from './AppMain';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './AppMain.css';
//import './dist/output.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
