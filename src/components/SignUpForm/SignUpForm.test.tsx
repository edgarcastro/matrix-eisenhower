import SingUpForm, { SignUpFormProps } from './SignUpForm';
import { render, waitFor, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  classes: {
    submit: '',
    form: '',
  },
  onSubmit() {
    // Do nothing
  },
};

function renderSingUpForm(props: SignUpFormProps) {
  return render(<SingUpForm {...props} />);
}

describe('<SignUpForm>', () => {
  it('Expect to render properly', async () => {
    const { findByTestId } = renderSingUpForm(defaultProps);
    const loginForm = await findByTestId('signup-form');
    expect(loginForm).toHaveFormValues({
      email: '',
      confirmEmail: '',
      password: '',
    });
  });

  it('Expect the field form were updated when the user type', async () => {
    const { findByTestId, findByLabelText } = renderSingUpForm(defaultProps);
    const loginForm = await findByTestId('signup-form');
    const inputEmail = await findByLabelText(/^Email Address*/);
    const inputConfirmEmail = await findByLabelText(/^Confirm Email Address*/);
    const inputPassword = await findByLabelText(/^Password*/);
    await userEvent.type(inputEmail, 'jane@doe.com');
    await userEvent.type(inputConfirmEmail, 'jane@doe.com');
    await userEvent.type(inputPassword, '12345');
    expect(loginForm).toHaveFormValues({
      email: 'jane@doe.com',
      confirmEmail: 'jane@doe.com',
      password: '12345',
    });
  });

  it('Expect the field form were updated when the user type', async () => {
    await act(async () => {
      const { findByLabelText } = renderSingUpForm(defaultProps);
      const inputEmail = await findByLabelText(/^Email Address*/);
      const inputConfirmEmail = await findByLabelText(
        /^Confirm Email Address*/
      );
      const submitButton = await screen.findByText('Sign Up');
      await userEvent.type(inputEmail, 'jane@doe.com');
      await userEvent.type(inputConfirmEmail, 'joe@doe.com');
      await userEvent.click(submitButton);
    });
    await waitFor(() =>
      expect(screen.findByText('The email are not the same')).toBeTruthy()
    );
  });

  it('Expect to call onSubmit function when the form is submitted', async () => {
    const spy = jest.fn();
    await act(async () => {
      renderSingUpForm({
        ...defaultProps,
        onSubmit: spy,
      });

      const inputEmail = await screen.findByLabelText(/^Email Address*/);
      const inputConfirmEmail = await screen.findByLabelText(
        /^Confirm Email Address*/
      );
      const inputPassword = await screen.findByLabelText(/^Password*/);
      const submitButton = await screen.findByText('Sign Up');

      await userEvent.type(inputEmail, 'jane@doe.com');
      await userEvent.type(inputConfirmEmail, 'jane@doe.com');
      await userEvent.type(inputPassword, '12345');
      await userEvent.click(submitButton);
    });

    const loginForm = await screen.findByTestId('signup-form');
    expect(loginForm).toHaveFormValues({
      email: 'jane@doe.com',
      confirmEmail: 'jane@doe.com',
      password: '12345',
    });
    expect(spy).toHaveBeenCalled();
  });
});
