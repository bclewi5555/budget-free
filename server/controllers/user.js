/*
======================================================
User controller
======================================================
*/

// Model dependencies
const db = require('../models/db');

/*
Sequelize Operators for queries
https://sequelize.org/master/variable/index.html#static-variable-Op
*/
const Op = db.Sequelize.Op;

exports.getUserFullName = async (req, res) => {
  try {
    const data = await db.users.findOne({
      where: {
        id: req.session.passport.user
      }
    });
    console.log(data.dataValues.username);
    res.send({ currentUser: data.dataValues.username });
  }
  catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
};

/* 
----------------
READ USER BY ID
----------------
*/
exports.getUser = async (identifier) => {

  await db.users.findOne({
    where: { [Op.or]: [{id: identifier}, {email: identifier}]}
  })
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      console.log(e);
      res.status(500).send({ message: `Could not find user with identifier = ${identifier}` });
    });

};

/* 
------------------
UPDATE USER BY ID
------------------
*/
exports.update = async (req, res) => {
  const id = req.params.id;

  await db.users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) { res.send({ message: 'User updated.' }); }
      else { res.send({ message: `Could not update user with id = ${id}` }); }
    })
    .catch(err => {
      res.status(500).send({ message: `Error updating user with id = ${id}` });
    });

};

/* 
------------------
DELETE USER BY ID
------------------
*/
exports.delete = async (req, res) => {
  const id = req.params.id;

  await db.users.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "User deleted" });
      } else {
        res.send({ message: `Cannot delete user with id = ${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: `Cannot delete user with id = ${id}.` });
    });

};
