import React from 'react';
import ReactDOM from 'react-dom/client';
import PagesRoutes from './router';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PagesRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

