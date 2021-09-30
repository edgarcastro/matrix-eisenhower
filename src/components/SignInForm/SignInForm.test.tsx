import React from 'react';
import SingInForm from './SignInForm';
import { render } from '@testing-library/react';

function renderSingInForm() {
  const props = {
    classes: {
      submit: '',
      form: '',
    },
    onSubmit() {
      // Do nothing
    },
  };

  return render(<SingInForm {...props} />);
}

describe('<SignInForm>', () => {
  it('Expect to render properly', async () => {
    const { findByTestId } = renderSingInForm();
    const loginForm = await findByTestId('signin-form');
    expect(loginForm).toHaveFormValues({
      email: '',
      password: '',
    });
  });
});
