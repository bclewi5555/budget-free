/*
======================================================
Passport authentication configuration
======================================================
*/

// Module dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Controller dependencies
const controller = require('../controllers/auth');

passport.serializeUser(controller.serializeUser);
passport.deserializeUser(controller.deserializeUser);

passport.use(new LocalStrategy(controller.authenticate));