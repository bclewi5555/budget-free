const cookieParser = require('cookie-parser');
const cors = require("cors");
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

let corsOptions = {
  origin: `http://localhost:${process.env.PORT}`
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

const db = require('./models');
const User = db.users;
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

module.exports = app;
