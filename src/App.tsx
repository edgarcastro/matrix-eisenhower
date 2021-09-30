import React, { useState, useContext } from 'react';
import './App.scss';
import { Auth, MatrixApp } from './pages';
import { auth } from './firebase';
import { AppContext } from './context';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setEmail, setDisplayName } = useContext(AppContext);
  auth.onAuthStateChanged(user => {
    if (user) {
      sessionStorage.setItem('userUID', user.uid);
      setEmail(user.email);
      setDisplayName(user.displayName);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  return isAuthenticated ? <MatrixApp /> : <Auth />;
};

export default App;
