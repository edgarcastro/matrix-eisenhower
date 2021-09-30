import React from 'react';
import MatrixApp from './MatrixApp';
import { shallow } from 'enzyme';
import { AppProvider } from '../../context';

function renderMatrixApp() {
  return shallow(
    <AppProvider>
      <MatrixApp />
    </AppProvider>
  );
}

describe('<MatrixApp>', () => {
  test('Expect the component match with the snapshot', () => {
    const wrapper = renderMatrixApp();
    expect(wrapper).toMatchSnapshot();
  });
});
