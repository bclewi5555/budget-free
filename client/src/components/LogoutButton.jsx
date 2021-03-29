import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import AuthService from '../services/AuthService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogoutButton(props) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState('');

  async function handleClick() {
    setIsLoading(true);
    try {
      const res = await AuthService.logout();
      if (res.status !== 200) {
        console.log(res);
      }
      setRedirect('/login');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  if (redirect !== '') {
    return <Redirect to={redirect} />
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      disabled={isLoading}
    >Logout</Button>
  );

}
