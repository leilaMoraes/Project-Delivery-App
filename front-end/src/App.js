import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
