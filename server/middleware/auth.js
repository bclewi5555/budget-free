/*
======================================================
Passport authentication middleware
======================================================
*/

// Module dependencies
const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

// Model dependencies
const UserModel = require('./models/users');

/*
-------------------------
USER SIGNUP
-------------------------
*/
passport.use(
  'signup',
  new LocalStrategy({
    // POST body properties that passport will use for authentication
    usernameField: 'email',
    passwordField: 'password'
  }),
  async (email, password, done) => {
    try {
      const user = await UserModel.create({ email, password });
    }
    catch (error) {
      done(error);
    }
  }
);

/*
-------------------------
USER LOGIN
-------------------------
*/
passport.use(
  'login',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }),
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) { return done(null, false, { message: 'User not found' }); }

      const validate = await user.isValidPassword(password);
      if (!validate) { return done(null, false, { message: 'Wrong password' }); }

      return done(null, user, { message: 'Logged in successfully' });
    }
    catch (error) {
      done(error);
    }
  }
);

/*
-------------------------
VERIFICATION
-------------------------
*/
passport.use(new JwtStrategy(
  {
    secretOrKey: 'TOP_SECRET',
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    }
    catch (error) {
      done(error);
    }
  }
));