import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render } from '@testing-library/react';

import Auth from './Auth';

const theme = createTheme();

function renderAuth() {
  return render(
    <ThemeProvider theme={theme}>
      <Auth />
    </ThemeProvider>
  );
}

describe('<Auth>', () => {
  test('Expect the component match with the snapshot', () => {
    const wrapper = renderAuth();
    expect(wrapper).toMatchSnapshot();
  });
});
