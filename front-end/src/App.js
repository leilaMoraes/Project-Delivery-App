import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './Routes';

function App() {
  return (
    <div className="App font-roboto">
      <ToastContainer />
      <Router />
    </div>
  );
}

export default App;
