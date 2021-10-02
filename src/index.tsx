import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { AppProvider } from './context';
import './firebase';
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
