import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ToastContainer theme="dark" autoClose={2000} closeOnClick position="top-right" pauseOnFocusLoss pauseOnHover>
      </ToastContainer>
        <App />
  </React.StrictMode>
);