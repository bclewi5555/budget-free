import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import AuthService from '../services/AuthService';

const useStyles = makeStyles((theme) => ({
    
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
     <Button className = {classes.title}
        type="button"
        onClick={handleClick}
        color="inherit"
        disabled={isLoading}
        >Logout</Button>
      
    );
    
  }