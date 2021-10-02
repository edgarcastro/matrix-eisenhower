import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { ClassNameMap } from '@mui/styles';

type requiredProps = {
  classes: ClassNameMap;
  onSubmit: (email: string, password: string) => void;
};

type SignUpFormProps = requiredProps;

const SignUpForm: React.FC<SignUpFormProps> = ({ classes, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form
      data-testid="signup-form"
      className={classes.form}
      noValidate
      onSubmit={e => onSignUp(e)}>
      <TextField
        tabIndex={0}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        tabIndex={0}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="confirmEmail"
        label="Confirm Email Address"
        name="confirmEmail"
      />
      <TextField
        tabIndex={0}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}>
        Sign In
      </Button>
    </form>
  );
};

export default SignUpForm;
