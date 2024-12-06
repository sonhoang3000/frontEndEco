import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContainer from './containers/App';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContainer />
    <App />
  </React.StrictMode>
);
