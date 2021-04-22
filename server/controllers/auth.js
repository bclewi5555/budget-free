/*
======================================================
Authentication controller
======================================================
*/

// Module dependencies
const bcrypt = require('bcrypt');

// Model dependencies
const db = require('../models/db');

// Config dependencies
require('../config/auth');

exports.login = (req, res) => {
  console.log('\n[Auth Controller] Issued Session ID: '+req.sessionID);
  res.json({sessionId: req.sessionID});
};

exports.validateSession = async (req, res) => {
  if (!req.sessionID) {
    return res.status(401);
  }

  // validate session
  console.log('\n[Auth Controller] Validating session...');
  const validSession = await db.sessions.findOne({
    where: { sid: req.sessionID }
  });
  if (!validSession) {
    return res.status(401).send('Invalid session');
  }
  console.log(validSession);
  console.log('[Auth Controller] Session validated.');

  // validate user
  console.log('[Auth Controller] Validating user...');
  const userId = validSession.data.passport.user;
  console.log(userId);
  const validUser = await db.users.findOne({
    where: { id: userId }
  });
  if (!validUser) {
    return res.status(401).send('Invalid user');
  }
  console.log('[Auth Controller] User validated.');

  res.status(200).send('OK');

};

exports.requireAuth = async (req, res, next) => {

  // validate request
  if (!req.sessionID) {
    console.log('[Auth Controller] sessionID required');
    return res.status(401);
  }

  // validate session
  console.log('\n[Auth Controller] Checking authorization...');
  const validSession = await db.sessions.findOne({
    where: { sid: req.sessionID }
  });
  if (!validSession) {
    console.log('[Auth Controller] Failed: Invalid session.');
    return res.status(401).send();
  }
  const sessionData = JSON.parse(validSession.data);
  if (!sessionData.passport) {
    console.log('[Auth Controller] Failed: Missing passport.');
    return res.status(401).send();
  }
  
  // validate user
  const userId = sessionData.passport.user;
  if (!userId) {
    console.log('[Auth Controller] Failed: Invalid passport.');
    return res.status(401).send();
  }
  const validUser = await db.users.findOne({
    where: { id: userId }
  });
  if (!validUser) {
    console.log('[Auth Controller] Failed: Invalid user.');
    return res.status(404).send('Could not find the requested user');
  }

  res.locals.authUser = validUser;
  res.locals.validSession = validSession;
  console.log('[Auth Controller] Done: authorized.');
  next();

};

exports.logout = (req, res) => {
  if (!req.sessionID) {
    return res.status(500).send('No authenticated user to log out.');
  }
  try {
    const destroyedSessionId = req.sessionID;
    console.log('\n[Auth Controller] Logging out...');
    req.logOut();
    req.session.destroy((err) => {
      console.log('[Auth Controller] Done: Logged out.');
      console.log('[Auth Controller] Destroyed Session ID: '+destroyedSessionId);
      res.json({destroyedSessionId: destroyedSessionId});
      //res.redirect('/login');
    });
  } catch(err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};
