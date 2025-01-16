import React from 'react';
import ReactDOM from 'react-dom/client';
import './font/font.css'
import './css/reset.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <BrowserRouter basename="/geumsan_bus/">
    <App />
    </BrowserRouter>
  // </React.StrictMode>
);

// reportWebVitals();
