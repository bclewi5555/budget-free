/*
======================================================
Backend Server
======================================================
*/

/*
------------------------
Dependencies
------------------------
*/

// Module dependencies
/*
cookie-parser longer needed as of express-session 1.5.0
https://www.npmjs.com/package/express-session
const cookieParser = require('cookie-parser');
*/
const cors = require('cors');
const express = require('express');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Config dependencies
const { configurePassport } = require('./config/auth');

// Middleware dependencies
const flashMessageMiddleware = require('./middleware/flash-messages');

// Model dependencies
const db = require('./models/db');

// Route dependencies
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

/*
------------------------
Server Setup
------------------------
*/
const app = express();
app.set('view-engine', 'ejs');
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  tableName: 'sessions',
  checkExpirationInterval: process.env.SESSION_STORE_CLEANUP_INTERVAL, // 15 min
  expiration: process.env.SESSION_STORE_EXPIRATION // 24 hrs
});
configurePassport(passport);

/*
------------------------
Middleware Configuration
------------------------
*/
app.use(morgan('dev'));
app.use(cors({
  origin: `http://localhost:${process.env.PORT}`
}));
// parse requests with content-type: application/json
app.use(express.json());
// parse requests with content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const sessionOptions = {
  key: 'sid',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  cookie: {
    httpOnly: false,
    maxAge: parseInt(process.env.SESSION_LIFETIME),
    path: '/',
    sameSite: false,
    secure: false
  }
};
if (process.env.NODE_ENV === 'production') {
  sessionOptions.cookie.httpOnly = true;
  sessionOptions.cookie.sameSite = true;
  sessionOptions.cookie.secure = true;
  app.disable('x-powered-by'); // hide this info from hackers
}
// If you have your node.js behind a proxy and are using secure: true,
// you need to set "trust proxy" in express.
// https://www.npmjs.com/package/express-session
//app.set('trust proxy', 1); // trust first proxy
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(flashMessageMiddleware.flashMessages);

/*
------------------------
Database Instantiation
------------------------
*/
db.sequelize.sync({ force: true }).then(() => {
  console.log('Sequelize dropped and re-synced the database.');
});

/*
------------------------
Route Configuration
------------------------
*/
app.route('/')
  .get(indexRouter);

app.route('/login')
  .get(indexRouter)
  .post(authRouter);

app.route('/signup')
  .get(indexRouter)
  .post(authRouter);

app.route('/logout')
  .delete(authRouter);

module.exports = app;