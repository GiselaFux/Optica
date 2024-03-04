import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ComprarContextProvider from './Context/ComprarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ComprarContextProvider>
    <App />
  </ComprarContextProvider>
);


