import React from 'react';
import { Button, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ClassNameMap } from '@mui/styles';
interface RequiredProps {
  classes: ClassNameMap;
  onSubmit: (email: string, password: string) => void;
}

export type SignUpFormProps = RequiredProps;

interface IFormInput {
  email: string;
  confirmEmail: string;
  password: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = props => {
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    props.onSubmit(data.email, data.password);
  };

  const { classes } = props;

  return (
    <form
      data-testid="signup-form"
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="email"
            data-testid="signup-email-input"
            label="Email Address"
            type="email"
            autoComplete="email"
            autoFocus
            helperText=" "
          />
        )}
      />

      <Controller
        name="confirmEmail"
        control={control}
        defaultValue=""
        rules={{
          validate: value =>
            value.toLowerCase() === getValues('email').toLowerCase(),
        }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="confirmEmail"
            data-testid="signup-confirm-email-input"
            label="Confirm Email Address"
            type="email"
            error={!!errors.confirmEmail}
            helperText={
              !errors.confirmEmail ? ' ' : 'The email are not the same'
            }
            autoComplete="off"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            data-testid="signup-password-input"
            autoComplete="current-password"
            helperText=" "
          />
        )}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
