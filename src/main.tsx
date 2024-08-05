import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './firebase';
import App from './App';
import { AppProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
