/*
======================================================
Group (of Envelopes) controller
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
CREATE NEW GROUP IN THE GIVEN BUDGET MONTH
----------------
*/
exports.createGroup = async (req, res) => {

  // validate request
  if (!req.body.budgetMonthId || !req.body.label) {
    console.log('[Group Controller] Invalid Request: budgetMonthId and label required to create a group');
    return res.status(400).send('budgetMonthId and label required to create a group.');
  }

  // check if resource(s) referenced exist
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: req.body.budgetMonthId
    }
  });
  if (!budgetMonth) {
    console.log('[Group Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // Check if authUser perms include budgetId of given budgetMonth
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[Group Controller] budgetIdsPermitted: '+budgetIdsPermitted);
  //console.log('[Group Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  //console.log('[Group Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Group Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  //console.log('[Group Controller] Permission to the requested resource granted.');

  // perform request
  console.log('\n[Group Controller] Creating new group...');
  const newGroup = await db.groups.create({
    budget_month_id: req.body.budgetMonthId,
    label: req.body.label
  });
  console.log('[Group Controller] Done: New group created with id: '+newGroup.id);
  return res.status(200).send(newGroup);

};

/* 
----------------
READ GROUPS (OF ENVELOPES) OF THE GIVEN BUDGET MONTH
----------------
*/
exports.getGroups = async (req, res) => {

  // validate request
  if (!req.query.budgetMonthId) return res.status(400).send('budgetMonthId required');

  // check if resource(s) referenced exist
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: req.query.budgetMonthId
    }
  });
  if (!budgetMonth) {
    console.log('[Group Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[Group Controller] budgetIdsPermitted: '+budgetIdsPermitted);
  //console.log('[Group Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  //console.log('[Group Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Group Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  //console.log('[Group Controller] Permission to the requested resource granted.');

  // perform request
  console.log('\n[Group Controller] Getting groups...');
  const groupsRes = await db.groups.findAll({
    where: { 
      budget_month_id: req.query.budgetMonthId
    }
  });
  console.log('[Group Controller] Done: '+JSON.stringify(groupsRes));
  return res.send(groupsRes);

};

/* 
----------------
UPDATE GROUP (OF ENVELOPES)
----------------
*/
exports.updateGroup = async (req, res) => {

  // validate request
  if (!req.params.groupId || (!req.body.label && !req.body.budgetMonthId) ) {
    console.log('[Group Controller] Invalid Request: groupId and either label or budgetMonthId are\ required to update a group.');
    return res.status(400).send('groupId and either label or budgetMonthId are required to update a group.');
  }
  /*
  console.log('[Group Controller] req.params.groupId: '+req.params.groupId);
  if (req.body.label) {
    console.log('[Group Controller] req.body.label: '+req.body.label);
  }
  if (req.body.budgetMonthId) {
    console.log('[Group Controller] req.body.budgetMonthId: '+req.body.budgetMonthId);
  }
  */

  // check if resource(s) referenced exist
  const group = await db.groups.findOne({
    where: {
      id: req.params.groupId
    }
  });
  if (!group) {
    console.log('[Group Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  let newBudgetMonth;
  if (req.body.budgetMonthId) { // if user provided a new budgetMonthId in req.body
    newBudgetMonth = await db.budgetMonths.findOne({
      where: {
        id: req.body.budgetMonthId
      }
    });
    if (!newBudgetMonth) {
      console.log('[Group Controller] Invalid Request: The new budgetMonthId provided could not be found');
      return res.status(404).send('Invalid Request: The new budgetMonthId provided could not be found');
    }
    //console.log('[Group Controller] newBudgetMonth.budget_id: '+newBudgetMonth.budget_id);
  }
  
  // validate permissions
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  //console.log('[Group Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[Group Controller] budgetIdsPermitted: '+budgetIdsPermitted);
  let permGranted;
  if (req.body.budgetMonthId) {
    permGranted = 
      budgetIdsPermitted.includes(budgetMonth.budget_id) && 
      budgetIdsPermitted.includes(newBudgetMonth.budget_id);
  } else {
    permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  }
  //console.log('[Group Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Group Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  //console.log('[Group Controller] Permission to the requested resource granted.');
  
  // perform request
  console.log('\n[Group Controller] Updating group...');
  const updateRes = await db.groups.update(
  {
    budget_month_id: req.body.budgetMonthId,
    label: req.body.label
  },
  { where: { id: req.params.groupId}}
  );
  if (updateRes != 1) { // not using !== because typeof updateRes is object with int
    console.log('[Group Controller] Failed: The requested resource could not be updated');
    return res.status(500).send('[Group Controller] Failed: The requested resource could not be updated');
  }
  console.log('[Group Controller] Done: updated group');
  return res.status(204).send(); // no content

};

/* 
----------------
DELETE A GROUP
----------------
*/
exports.deleteGroup = async (req, res) => {

  // validate request
  if (!req.params.groupId) {
    console.log('[Group Controller] groupId required to delete group');
    return res.status(400).send('groupId required to delete group');
  }
  //console.log('[Group Controller] req.params.groupId: '+req.params.groupId);

  // check if resource(s) referenced exist
  const group = await db.groups.findOne({
    where: {
      id: req.params.groupId
    }
  });
  if (!group) {
    console.log('[Group Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[Group Controller] budgetIdsPermitted: '+budgetIdsPermitted);
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  //console.log('[Group Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  //console.log('[Group Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Group Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  //console.log('[Group Controller] Permission to the requested resource granted.');

  // perform request
  console.log('\n[Group Controller] Deleting group...');
  const deleteRes = await db.groups.destroy({
    where: {
      id: req.params.groupId
    }
  });
  if (deleteRes != 1) { // not using !== because typeof deleteRes is object with int
    console.log('[Group Controller] Error: The requested resource could not be deleted');
    return res.status(500).send();
  }
  console.log('[Group Controller] Done: Deleted the requested resource');
  return res.status(204).send(); // No Content

};