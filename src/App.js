import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Provider from './contexts/Provider';

function App() {
  return (
    <Provider>
      <Login />
    </Provider>
  );
}

export default App;
