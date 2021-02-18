/*
======================================================
Passport authentication API router
======================================================
*/

// Module dependencies
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

router.post('/signup', 
  passport.authenticate('signup', {
    session: false, // session support disabled
    successRedirect: '/budget',
    failureRedirect: '/login',
    failureFlash: true // strategy's verify callback error message
  }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try { 
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error); // passport error
      }  
  
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.TOKEN);
        return res.json({ token });
      });
    } 
    catch (error) {
      return next(error); // try block error
    }
  })(req, res, next);
});

module.exports = router;