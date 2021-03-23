// modules
import React, { useState } from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
  firstName: yup.string('Enter your first name')
    .max(255, 'Cannot be more than 255 characters')
    .required('First name is required'),
  lastName: yup.string('Enter your last name')
    .max(255, 'Cannot be more than 255 characters')
    .required('Last name is required'),
  email: yup.string('Enter your email')
    .email('Enter a valid email')
    .max(255, 'Cannot be more than 255 characters')
    .required('Email is required'),
  emailConfirmation: yup.string()
    .oneOf([yup.ref('email'), null], 'Emails must match')
    .required('Email confirmation is required'),
  username: yup.string('Enter your username')
    .max(255, 'Cannot be more than 255 characters')
    .required('Username is required'),
  password: yup.string('Enter your password')
    .min(10, 'Password must have at least 10 characters')
    .max(255, 'Cannot be more than 255 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})/,
      "Must contain at least 10 characters, one uppercase, one lowercase, one number, and one special case character"
     )
    .required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
  subscription: yup.boolean()
});

export default function SignupForm() {
  const [redirect, setRedirect] = useState('');
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      emailConfirmation: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      subscription: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await AuthService.signup({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
        subscription: values.subscription
      });
      if (res.status === 200) {
        setRedirect('/login');
      }
    }
  });

  if (redirect !== '') {
    console.log('Redirect: '+redirect);
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
          Sign up
        </Typography>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                autoComplete="given-name"
                variant="outlined"
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                autoComplete="family-name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete="email"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="emailConfirmation"
                name="emailConfirmation"
                label="Confirm Email"
                type="email"
                value={formik.values.emailConfirmation}
                onChange={formik.handleChange}
                error={formik.touched.emailConfirmation && Boolean(formik.errors.emailConfirmation)}
                helperText={formik.touched.emailConfirmation && formik.errors.emailConfirmation}
                autoComplete="off"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="username"
                name="username"
                label="Username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                autoComplete="username"
                variant="outlined"
                fullWidth
              />
            </Grid>
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
                autoComplete="new-password"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="passwordConfirmation"
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                autoComplete="off"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="subscription"
                    value={formik.values.subscription}
                    onChange={formik.handleChange}
                    color="primary" 
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to='/login' variant="body2" >
                Already have an account? Sign in
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