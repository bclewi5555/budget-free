/*
======================================================
Index controller
======================================================
*/

// Model dependencies
const db = require('../models/db');

exports.serveIndex = async (req, res) => {
  try {
    const user = await db.users.findOne({
      where: {
        id: req.session.passport.user
      }
    });
    res.render('index.ejs', { name: `${user.firstName} ${user.lastName}` });
  }
  catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
};

exports.serveLogin = (req, res) => {
  res.render('login.ejs');
};

exports.serveSignup = (req, res) => {
  res.render('signup.ejs');
};