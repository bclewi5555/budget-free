// modules
import React, { useState } from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// services
import AuthService from '../services/AuthService';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        BudgetFree
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const validationSchema = yup.object({
  identifier: yup.string('Enter your email or username')
    .max(255, 'Cannot be more than 255 characters')
    .required('Email or username is required'),
  password: yup.string('Enter your password')
    .min(10, 'Password must have a minimum length of 10 characters')
    .max(255, 'Cannot be more than 255 characters')
    .required('Password is required')
});

export default function LoginForm(props) {
  const [redirect, setRedirect] = useState('');
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await AuthService.login({
        identifier: values.identifier,
        password: values.password
      });
      if (res.status === 200) {
        setRedirect('/');
      }
    }
  });

  if (redirect !== '') {
    console.log('[LoginForm] Redirect: '+redirect);
    return (
      <Redirect to={redirect} />
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="identifier"
                name="identifier"
                label="Email or username"
                type="text"
                value={formik.values.identifier}
                onChange={formik.handleChange}
                error={formik.touched.identifier && Boolean(formik.errors.identifier)}
                helperText={formik.touched.identifier && formik.errors.identifier}
                autoComplete="email"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="current-password"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            color="primary"
            variant="contained"
            className={classes.submit}
            fullWidth
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item xs>
              <Link component={RouterLink} to='/login' variant="body2">
                Forgot Password
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to='/signup' variant="body2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}