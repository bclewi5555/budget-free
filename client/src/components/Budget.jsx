import React, { useState } from 'react';
import BudgetMonth from './BudgetMonth';
import LogoutButton from './LogoutButton';
import Nav from './Nav';

export default function Budget() {
  const [month, setMonth] = useState(/*Date.today().month()*/);

  /*
  import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import AuthService from '../services/AuthService';

const classes = useStyles();

const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState('');


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

  if (redirect) {
    return(
      <Redirect to='/login' />
    );
  }

  <Button
      type="button"
      onClick={handleClick}
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      disabled={isLoading}
    >Logout</Button>
  */

  return(
    <div>
      <LogoutButton />
      <Nav />
      <BudgetMonth />
    </div>
  );

}