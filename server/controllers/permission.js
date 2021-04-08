/*
======================================================
Permission controller
======================================================
*/

// Model dependencies
const db = require('../models/db');
/*
Sequelize Operators for queries
https://sequelize.org/master/variable/index.html#static-variable-Op
*/
const Op = db.Sequelize.Op;

/* 
----------------
READ PERMISSIONS OF THE AUTHENTICATED USER
----------------
*/
exports.getPerms = async (req, res, next) => {
  console.log('\n[Perm Controller] Getting permissions...');

  const permsRes = await db.permissions.findAll({
    where: { [Op.and]: [
      { userId: res.locals.authUser.id },
      { is_admin: true }
    ]}
  });
  res.locals.perms = permsRes; // make available to next() middleware
  console.log('[Perm Controller] Done');
  next();

};
