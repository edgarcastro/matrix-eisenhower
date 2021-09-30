import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Matrix from '../../components/Matrix';
import { signOut } from '../../api';
import { APP_NAME } from '../../constants';
import { useStyles } from './MatrixApp.hooks';
import { AppContext } from '../../context';

const MatrixApp: React.FC = () => {
  const classes = useStyles();
  const { displayName } = useContext(AppContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {APP_NAME}
          </Typography>
          {displayName ? `Hola, ${displayName}` : ''}
          <Button onClick={signOut} color="inherit">
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Matrix />
    </div>
  );
};

export default MatrixApp;
