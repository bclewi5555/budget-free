/*
======================================================
Backend Server
======================================================
*/

// Module dependencies
const cookieParser = require('cookie-parser');
const cors = require("cors");
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

// Route dependencies
const authRouter = require('./routes/auth');
const budgetRouter = require('./routes/budget');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Model dependencies
const db = require('./models');

const app = express();

let corsOptions = {
  origin: `http://localhost:${process.env.PORT}`
};

// Module middleware
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// API endpoints
app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// Secure API endpoints
app.use('/api/budget', passport.authenticate('jwt', { session: false }), budgetRouter);

// Instantiate database from model
const User = db.users;
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

module.exports = app;
