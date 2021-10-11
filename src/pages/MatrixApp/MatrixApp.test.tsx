import React from 'react';
import MatrixApp from './MatrixApp';
import { AppProvider } from '../../context';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function renderMatrixApp() {
  const theme = createTheme();

  return render(
    <AppProvider>
      <ThemeProvider theme={theme}>
        <MatrixApp />
      </ThemeProvider>
    </AppProvider>
  );
}

describe('<MatrixApp>', () => {
  test('Expect the component match with the snapshot', () => {
    const wrapper = renderMatrixApp();
    expect(wrapper).toMatchSnapshot();
  });
});
