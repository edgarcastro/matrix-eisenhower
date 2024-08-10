import SingInForm, { SignInFormProps } from './SignInForm';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps: SignInFormProps = {
  classes: {
    submit: '',
    form: '',
  },
  onSubmit() {
    // Do nothing
  },
};

function renderSingInForm(props: SignInFormProps) {
  return render(<SingInForm {...props} />);
}

describe('<SignInForm>', () => {
  it('Expect to render properly', async () => {
    const { findByTestId } = renderSingInForm(defaultProps);
    const loginForm = await findByTestId('signin-form');
    expect(loginForm).toHaveFormValues({
      email: '',
      password: '',
    });
  });

  it('Expect to call onSubmit function when the form is submitted', async () => {
    const spy = jest.fn();
    await act(async () => {
      renderSingInForm({
        ...defaultProps,
        onSubmit: spy,
      });

      const inputEmail = await screen.findByLabelText(/^Email Address*/);
      const inputPassword = await screen.findByLabelText(/^Password*/);
      const submitButton = await screen.findByText('Sign In');

      await userEvent.type(inputEmail, 'jane@doe.com');
      await userEvent.type(inputPassword, '12345');
      await userEvent.click(submitButton);
    });

    const loginForm = await screen.findByTestId('signin-form');
    expect(loginForm).toHaveFormValues({
      email: 'jane@doe.com',
      password: '12345',
    });
    expect(spy).toHaveBeenCalled();
  });
});
