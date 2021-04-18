/*
======================================================
Budget controller
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
CREATE NEW BUDGET FOR THE AUTHENTICATED USER
----------------
*/
exports.createBudget = async (req, res) => {

  // validate request
  if (!req.body.label) {
    console.log('[Budget Controller] label required to create new budget');
    return res.status(400).send('label required to create new budget');
  }

  // perform request
  console.log('\n[Budget Controller] Creating new budget...');
  const newBudget = await db.budgets.create({
    label: req.body.label
  });
  //console.log(newBudget);
  const newPerm = await db.permissions.create({
    budgetId: newBudget.id,
    userId: res.locals.authUser.id,
    is_owner: true,
    is_admin: true
  });
  //console.log(newPerm);
  console.log('[Budget Controller] Done: New budget created with id: '+newBudget.id);
  return res.status(200).send({
    newBudget: newBudget,
    newPerm: newPerm
  });
}

/* 
----------------
READ BUDGETS OF THE AUTHENTICATED USER
----------------
*/
exports.getBudgets = async (req, res) => {

  // request already validated

  // no resources referenced
  
  // Get all budgets which the authenticated user has permission to
  console.log('\n[Budget Controller] Getting budgets...');
  const budgetIds = [];
  res.locals.perms.map(perm => {
    budgetIds.push(perm.budgetId);
  });
  //console.log('[Budget Controller] budgetIds: '+budgetIds);
  const budgetsRes = await db.budgets.findAll({
    where: { 
      id: { [Op.or]: budgetIds }
    }
  });
  console.log('[Budget Controller] Done: '+JSON.stringify(budgetsRes));
  return res.status(200).send(budgetsRes);

};

/* 
----------------
UPDATE A BUDGET OF THE AUTHENTICATED USER
----------------
*/
exports.updateBudget = async (req, res) => {

  // validate request
  if (!req.params.budgetId || !req.body.label) {
    console.log('[Budget Controller] budgetId and label required to update budget');
    return res.status(400).send('budgetId and label required to update budget');
  }
  //console.log('[Budget Controller] req.params.budgetId: '+req.params.budgetId);

  // check if resource(s) referenced exist
  const budget = await db.budgets.findOne({
    where: {
      id: req.params.budgetId
    }
  });
  if (!budget) {
    console.log('[Budget Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[Budget Controller] permBudgetIds: '+permBudgetIds);
  if (!budgetIdsPermitted.includes(req.params.budgetId)) {
    console.log('[Budget Controller] Permission to the requested resource denied');
    return res.status(401).send('Permission to the requested resource denied');
  }

  // perform request
  console.log('\n[Budget Controller] Updating budgets...');
  const updateRes = await db.budgets.update(
    { label: req.body.label },
    { where: { id: req.params.budgetId }}
  );
  if (updateRes != 1) { // not using !== because typeof updateRes is object with int
    console.log('[Budget Controller] Failed: The requested resource could not be updated');
    return res.status(500).send('[Budget Controller] Failed: The requested resource could not be updated');
  }
  console.log('[Budget Controller] Done: Updated the requested resource');
  return res.status(204).send(); // no content

};

/* 
----------------
DELETE A BUDGET OF THE AUTHENTICATED USER
----------------
*/
exports.deleteBudget = async (req, res) => {

  // validate request
  if (!req.params.budgetId) {
    console.log('[Budget Controller] budgetId required to delete budget');
    return res.status(400).send('budgetId required to delete budget');
  }
  //console.log('[Budget Controller] req.params.budgetId: '+req.params.budgetId);

  // check if resource(s) referenced exist
  const budget = await db.budgets.findOne({
    where: {
      id: req.params.budgetId
    }
  });
  if (!budget) {
    console.log('[Budget Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[Budget Controller] permBudgetIds: '+permBudgetIds);
  if (!budgetIdsPermitted.includes(req.params.budgetId)) {
    console.log('[Budget Controller] Permission to the requested resource denied');
    return res.status(401).send('Permission to the requested resource denied');
  }

  // perform request
  console.log('\n[Budget Controller] Deleting budget...');
  const deleteRes = await db.budgets.destroy({
    where: {
      id: req.params.budgetId
    }
  });
  if (deleteRes != 1) { // not using !== because typeof deleteRes is object with int
    console.log('[Budget Controller] Error: The requested resource could not be deleted');
    return res.status(500).send();
  }
  console.log('[Budget Controller] Done: Deleted the requested resource');
  return res.status(204).send(); // No Content

};