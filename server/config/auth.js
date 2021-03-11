/*
======================================================
Passport authentication configuration
======================================================
*/

// Module dependencies
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

// Model dependencies
const db = require('../models/db');

exports.configurePassport = (passport) => {
  const _authenticateUser = async (email, password, next) => {
    console.log('\n[Passport] Authenticating...');
    
    // Validate User
    const user = await db.users.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { email: email },
          { username: email }
        ]
      }
    });
    //console.log(`user matched in db: ${JSON.stringify(user)}`);
    if (!user) {
      console.log('[Passport] Failed: Invalid username/email.');
      return next(null, false, { message: 'No user with that email' });
    }

    // Validate Password
    try {
      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        console.log('[Passport] Failed: Password incorrect.');
        return next(null, false, { message: 'Password incorrect' });
      }
      console.log('[Passport] Done: Authenticated');
      return next(null, user);
    } catch (err) {
      return next(err);
    }

  }

  // Helper function
  // TODO: Refactor into util
  const _findUserById = async (id) => {
    return await db.users.findOne({
      where: { id: id }
    });
  };

  // Configure the local strategy for use by Passport.
  // https://github.com/passport/express-4.x-local-example/blob/master/server.js
  //
  // The local strategy requires a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user in `req.body`.  The function must verify
  // that the password is correct and then invoke `next(err, user)` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new LocalStrategy(
    { 
      usernameField: 'email',
      passwordField: 'password',
      //session: true,
      //passReqToCallback: true
    }, 
    _authenticateUser
  ));

  // Configure Passport authenticated session persistence.
  // https://github.com/passport/express-4.x-local-example/blob/master/server.js
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser((user, next) => next(null, user.id));
  passport.deserializeUser((id, next) => {
    return next(null, _findUserById(id));
  });

}
