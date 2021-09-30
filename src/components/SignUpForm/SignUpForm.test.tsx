import React from 'react';
import SingUpForm from './SignUpForm';
import { render } from '@testing-library/react';

function renderSingUpForm() {
  const props = {
    classes: {
      submit: '',
      form: '',
    },
    onSubmit() {
      // Do nothing
    },
  };

  return render(<SingUpForm {...props} />);
}

describe('<SignInForm>', () => {
  it('Expect to render properly', async () => {
    const { findByTestId } = renderSingUpForm();
    const loginForm = await findByTestId('signup-form');
    expect(loginForm).toHaveFormValues({
      email: '',
      confirmEmail: '',
      password: '',
    });
  });
});
