import React from 'react';
import Auth from './Auth';
import { shallow } from 'enzyme';

function renderAuth() {
  return shallow(<Auth />);
}

describe('<Auth>', () => {
  test('Expect the component match with the snapshot', () => {
    const wrapper = renderAuth();
    expect(wrapper).toMatchSnapshot();
  });
});
