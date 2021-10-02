import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { ClassNameMap } from '@mui/styles';

interface requiredProps {
  classes: ClassNameMap;
  onSubmit: (email: string, password: string) => void;
}

type SignInFormProps = requiredProps;

const SignInForm: React.FC<SignInFormProps> = ({ classes, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form
      data-testid="signin-form"
      className={classes.form}
      noValidate
      onSubmit={e => login(e)}>
      <TextField
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

export default SignInForm;
