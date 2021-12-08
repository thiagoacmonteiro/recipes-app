import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './contexts/Provider';
import Routes from './routes';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
