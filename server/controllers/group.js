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

const validTypes = ['default', 'income'];

/* 
----------------
CREATE NEW GROUP IN THE GIVEN BUDGET MONTH
----------------
*/
exports.createGroup = async (req, res) => {
  const { budgetMonthId, type, label } = req.body;

  // validate request
  if (!budgetMonthId || !label) {
    console.log('[Group Controller] Invalid Request: budgetMonthId and label required to create a group');
    return res.status(400).send('budgetMonthId and label required to create a group.');
  }
  if (!type) {
    type = 'default';
  }
  else if (!validTypes.includes(type)) {
    return res.status(400).send('invalid type provided');
  }

  // check if resource(s) referenced exist
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: budgetMonthId
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
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  if (!permGranted) {
    console.log('[Group Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[Group Controller] Creating new group...');
  const newGroup = await db.groups.create({
    budget_month_id: budgetMonthId,
    label: label,
    type: type
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
  const { budgetMonthId } = req.query;

  // validate request
  if (!budgetMonthId) return res.status(400).send('budgetMonthId required');

  // check if resource(s) referenced exist
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: budgetMonthId
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
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  if (!permGranted) {
    console.log('[Group Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[Group Controller] Getting groups...');
  const groupsRes = await db.groups.findAll({
    where: { 
      budget_month_id: budgetMonthId
    }
  });
  if (!groupsRes) {
    console.log('[Group Controller] Failed: The requested groups could not be found');
    return res.status(404).send('[User Controller] Failed: The requested groups could not be found');
  }
  console.log('[Group Controller] Done');
  return res.send(groupsRes);

};

/* 
----------------
UPDATE GROUP (OF ENVELOPES)
----------------
*/
exports.updateGroup = async (req, res) => {
  const { groupId } = req.params;
  const { label, budgetMonthId } = req.body;

  // validate request
  if (!groupId || (!label && !budgetMonthId) ) {
    console.log('[Group Controller] Invalid Request: groupId and either label or budgetMonthId are\ required to update a group.');
    return res.status(400).send('groupId and either label or budgetMonthId are required to update a group.');
  }

  // check if resource(s) referenced exist
  const group = await db.groups.findOne({
    where: {
      id: groupId
    }
  });
  if (!group) {
    console.log('[Group Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  let newBudgetMonth;
  if (budgetMonthId) { // if user provided a new budgetMonthId in req.body
    newBudgetMonth = await db.budgetMonths.findOne({
      where: {
        id: budgetMonthId
      }
    });
    if (!newBudgetMonth) {
      console.log('[Group Controller] Invalid Request: The new budgetMonthId provided could not be found');
      return res.status(404).send('Invalid Request: The new budgetMonthId provided could not be found');
    }
  }
  
  // validate permissions
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  let permGranted;
  if (budgetMonthId) {
    permGranted = 
      budgetIdsPermitted.includes(budgetMonth.budget_id) && 
      budgetIdsPermitted.includes(newBudgetMonth.budget_id);
  } else {
    permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  }
  if (!permGranted) {
    console.log('[Group Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  
  // perform request
  console.log('\n[Group Controller] Updating group...');
  const updateRes = await db.groups.update(
  {
    budget_month_id: budgetMonthId,
    label: label
  },
  { where: { id: groupId}}
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
  const { groupId } = req.params;

  // validate request
  if (!groupId) {
    console.log('[Group Controller] groupId required to delete group');
    return res.status(400).send('groupId required to delete group');
  }

  // check if resource(s) referenced exist
  const group = await db.groups.findOne({
    where: {
      id: groupId
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
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  if (!permGranted) {
    console.log('[Group Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[Group Controller] Deleting group...');
  const deleteRes = await db.groups.destroy({
    where: {
      id: groupId
    }
  });
  if (deleteRes != 1) { // not using !== because typeof deleteRes is object with int
    console.log('[Group Controller] Error: The requested resource could not be deleted');
    return res.status(500).send();
  }
  console.log('[Group Controller] Done: Deleted the requested resource');
  return res.status(204).send(); // No Content

};