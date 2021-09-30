import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '../../api';
import { SignUpForm, SignInForm, Copyright } from '../../components';
import { Lock } from '@material-ui/icons';
import { useStyles } from './Auth.hooks';

const Auth: React.FC = () => {
  const classes = useStyles();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Lock />
          </Avatar>
          <Typography component="h1" variant="h5">
            {showRegister ? 'Sign up' : 'Sign in'}
          </Typography>
          {showRegister ? (
            <SignUpForm
              onSubmit={createUserWithEmailAndPassword}
              classes={classes}
            />
          ) : (
            <SignInForm
              onSubmit={signInWithEmailAndPassword}
              classes={classes}
            />
          )}
          <Grid container>
            <Grid item>
              <Button
                onClick={() => setShowRegister(prev => !prev)}
                color="primary">
                {showRegister
                  ? 'I have an account'
                  : 'Do not have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default Auth;
