/*
======================================================
Backend Server
======================================================
*/

// Module dependencies
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const flash = require('express-flash');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Route dependencies
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');

// Model dependencies
const db = require('./models/db');

const app = express();

// Module middleware
app.use(cookieParser());
app.use(cors({
  origin: `http://localhost:${process.env.PORT}`
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(morgan('dev'));

// Session middleware
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  tableName: 'sessions',
  checkExpirationInterval: 15 * 60 * 1000, // 15 min cleanup expired sessions interval (ms)
  expiration: 24 * 60 * 60 * 1000 // 24 hrs maximum valid session age (ms)
});
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false, // set to true for HTTPS, false for HTTP
    maxAge: 1000 * 60 * 60 * 24 * 14 // 14 days
  } 
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
 
// Instantiate database from model
db.sequelize.sync({ force: true }).then(() => {
  console.log('Sequelize dropped and re-synced the database.');
});
//sessionStore.sync();

// API endpoints
app.use('/api/v1', indexRouter);
app.use('/api/v1/auth', authRouter);
//app.use('/api/v1/users', usersRouter);

module.exports = app;
