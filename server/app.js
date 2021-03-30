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
//const cors = require('cors'); // not needed for local proxy?
const express = require('express');
const flash = require('connect-flash');
//const methodOverride = require('method-override'); // replaced DELETE with POST
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
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
const envelopeRouter = require('./routes/envelope');
const userRouter = require('./routes/user');

/*
------------------------
Server Setup
------------------------
*/
const app = express();
function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId
  };
}
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  table: 'sessions',
  checkExpirationInterval: process.env.SESSION_STORE_CLEANUP_INTERVAL, // 15 min
  expiration: process.env.SESSION_STORE_EXPIRATION, // 24 hrs
  extendDefaultFields: extendDefaultFields
});
configurePassport(passport);

/*
------------------------
Middleware Configuration
------------------------
*/
app.use(morgan('dev'));
/* When restricting Cross Origin Resources to a dynamic white list
const whitelist = [
  'http://localhost:'+process.env.PORT,
  'http://localhost:'+process.env.REACT_APP_PORT
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
*/
//app.use(cors(/*corsOptions*/));
// parse requests with content-type: application/json
app.use(express.json());
// parse requests with content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const sessionOptions = {
  cookie: {
    httpOnly: false,
    maxAge: parseInt(process.env.SESSION_LIFETIME),
    path: '/',
    sameSite: true,
    secure: false
  },
  key: 'sid',
  //proxy: true, // if you do SSL outside of node
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: sessionStore, // Sequelize manages session table in database
  unset: 'destroy'
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
//app.use(methodOverride('_method')); // replaced DELETE with POST
app.use(flashMessageMiddleware.flashMessages);

/*
------------------------
Database Instantiation
------------------------
*/
const sequelize = require('sequelize');
db.sequelize.sync({ force: true }).then(() => {
  console.log('[Sequelize] Dropped and re-synced the database.');

  // Create Sample Data
  (async () => {
    try {
      const userRes = await db.users.create({
        id: 'eeee1972-a077-43eb-b83b-ce842e3c833f',
        first_name: 'John',
        last_name: 'Doe',
        email: 'jd@example.com',
        username: 'JohnDoe00',
        password_hash: process.env.PASSWORD_HASH_SAMPLE,
        subscription: true
      });
      console.log('[Sequelize] Sample user created.');
      const budgetRes = await db.budgets.create({
        id: 'b95573be-8f56-4d29-b7a4-fba07c60a859',
        label: 'Home'
      });
      console.log('[Sequelize] Sample budget created.');
      const budgetMonthRes = await db.budgetMonths.create({
        id: '1d8b021a-d5ac-4043-8038-5cca73346d61',
        year: 2021,
        month: 3
      });
      console.log('[Sequelize] Sample budgetMonth created.');
      const permissionRes = await db.permissions.create({
        budgetId: 'b95573be-8f56-4d29-b7a4-fba07c60a859',
        userId: 'eeee1972-a077-43eb-b83b-ce842e3c833f',
        is_owner: true,
        is_admin: true
      });
      console.log('[Sequelize] Sample permissions created.');
      const groupIncomeRes = await db.groups.create({
        id: '4c2d628d-6f5e-45d6-b661-b7d4e0e210b4',
        budget_month_id: '1d8b021a-d5ac-4043-8038-5cca73346d61',
        label: 'Income'
      });
      const groupFoodRes = await db.groups.create({
        id: '86d86f8d-d4ad-4ffe-9191-3f4aed7cd330',
        budget_month_id: '1d8b021a-d5ac-4043-8038-5cca73346d61',
        label: 'Food'
      });
      console.log('[Sequelize] Sample groups created.');
      const envelopePaychecksRes = await db.envelopes.create({
        id: 'cc56b50e-a22a-46c5-959d-d4d77b56dbee',
        group_id: '4c2d628d-6f5e-45d6-b661-b7d4e0e210b4',
        type: 'income',
        label: 'Paychecks',
        amount_planned: 2000
      });
      const envelopeGroceriesRes = await db.envelopes.create({
        id: 'e2f5d72f-23d9-4533-827b-55d8f65f1b3d',
        group_id: '86d86f8d-d4ad-4ffe-9191-3f4aed7cd330',
        type: 'default',
        label: 'Groceries',
        amount_planned: 300,
        is_starred: true,
        notes: 'TODO: Review planned amount in May'
      });
      const envelopeDateNightFoodRes = await db.envelopes.create({
        id: '3f8a2522-90a9-4ea3-b3fa-9957e00d95c5',
        group_id: '86d86f8d-d4ad-4ffe-9191-3f4aed7cd330',
        type: 'sinking',
        label: 'Date Night Food',
        amount_planned: 100,
        is_starred: false
      });
      console.log('[Sequelize] Sample envelopes created.');
      const transactionPaycheckRes = await db.transactions.create({
        envelope_id: 'cc56b50e-a22a-46c5-959d-d4d77b56dbee',
        type: 'income',
        amount: 1000,
        date: sequelize.literal('CURRENT_TIMESTAMP'),
        label: 'Microsoft Paycheck'
      });
      const transactionPublixRes = await db.transactions.create({
        envelope_id: 'e2f5d72f-23d9-4533-827b-55d8f65f1b3d',
        type: 'expense',
        amount: 150,
        date: sequelize.literal('CURRENT_TIMESTAMP'),
        label: 'Publix'
      });
      const transactionKrogerRes = await db.transactions.create({
        envelope_id: 'e2f5d72f-23d9-4533-827b-55d8f65f1b3d',
        type: 'expense',
        amount: 35,
        date: sequelize.literal('CURRENT_TIMESTAMP'),
        label: 'Kroger'
      });
      const transactionAtlasPizzaRes = await db.transactions.create({
        envelope_id: '3f8a2522-90a9-4ea3-b3fa-9957e00d95c5',
        type: 'expense',
        amount: 45,
        date: sequelize.literal('CURRENT_TIMESTAMP'),
        label: 'Atlas Pizza Date w/ Jane'
      });
      console.log('[Sequelize] Sample transactions created.');
    } catch (err) {
      console.log(err);
    }
  })();

});

/*
------------------------
Route Configuration
------------------------
*/
// serve React static files
app.get('/', express.static(path.join(__dirname, '../client/build')));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/envelope', envelopeRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;