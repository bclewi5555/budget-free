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
MIDDLEWARE - PASS PERMISSIONS OF THE AUTHENTICATED USER TO NEXT()
----------------
*/
exports.getPerms = async (req, res, next) => {
  console.log('\n[Perm Controller] Getting permissions...');

  const permsRes = await db.permissions.findAll({
    where: { [Op.and]: [
      { user_id: res.locals.authUser.id },
      { is_admin: true }
    ]}
  });
  const perms = [];
  permsRes.map(perm => {
    perms.push({
      budgetId: perm.budget_id,
      userId: perm.user_id,
      isOwner: perm.is_owner,
      isAdmin: perm.is_admin,
      createdAt: perm.createdAt,
      updatedAt: perm.updatedAt
    });
  });
  res.locals.perms = perms; // make available to next() middleware
  console.log('[Perm Controller] Done');
  next();

};

/* 
----------------
MIDDLEWARE - REQUIRE BUDGET PERMISSIONS OF THE AUTHENTICATED USER AND PASS TO NEXT()
----------------
*/
exports.requirePerms = async (req, res, next) => {
  console.log('\n[Perm Controller] Getting permissions...');

  const permsRes = await db.permissions.findAll({
    where: { [Op.and]: [
      { user_id: res.locals.authUser.id },
      { is_admin: true }
    ]}
  });
  if (permsRes.length < 1) {
    console.log('[Perm Controller] Failed: The authorized user has no budget permissions');
    return res.status(401).send();
  }
  const perms = [];
  permsRes.map(perm => {
    perms.push({
      budgetId: perm.budget_id,
      userId: perm.user_id,
      isOwner: perm.is_owner,
      isAdmin: perm.is_admin,
      createdAt: perm.createdAt,
      updatedAt: perm.updatedAt
    });
  });
  res.locals.perms = perms; // make available to next() middleware
  
  console.log('[Perm Controller] Done');
  next();

};