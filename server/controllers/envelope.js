/*
======================================================
Envelope controller
======================================================
*/

// Model dependencies
const db = require('../models/db');
/*
Sequelize Operators for queries
https://sequelize.org/master/variable/index.html#static-variable-Op
*/
const Op = db.Sequelize.Op;

const validTypes = ['default', 'sinking'];

/* 
----------------
CREATE NEW ENVELOPE IN THE GIVEN GROUP
----------------
*/
exports.createEnvelope = async (req, res) => {
  const { groupId, type, label, amountPlanned, isStarred, dueDate, startingBalance, savingsGoal, notes } = req.body;

  // validate request
  if (!groupId || !label) {
    console.log('[Envelope Conroller] groupID and label required to create an envelope');
    return res.status(400).send('groupID and label required to create an envelope');
  }
  if (!type) {
    type = 'default';
  }
  else if (!validTypes.includes(type)) {
    return res.status(400).send('invalid type provided');
  }
  if (amountPlanned && amountPlanned < 0) {
    console.log('[Envelope Conroller] amountPlanned must be an non-negative integer');
    return res.status(400).send('amountPlanned must be an non-negative integer');
  }

  // check if resource(s) referenced exist
  const group = await db.groups.findOne({
    where: {
      id: groupId
    }
  });
  if (!group) {
    console.log('[Envelope Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[Envelope Controller] budgetIdsPermitted: '+budgetIdsPermitted);
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  //console.log('[Envelope Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  //console.log('[Envelope Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Envelope Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  //console.log('[Envelope Controller] Permission to the requested resource granted.');
  
  // perform request
  console.log('\n[Envelope Controller] Creating envelope...');
  const newEnvelope = await db.envelopes.create({
    group_id: groupId,
    type: type,
    label: label,
    amount_planned: amountPlanned,
    is_starred: isStarred,
    due_date: dueDate,
    starting_balance: startingBalance,
    savings_goal: savingsGoal,
    notes: notes
  });
  console.log('[Envelope Controller] Done: Created new envelope with id: '+newEnvelope.id);
  return res.status(200).send(newEnvelope);

};

/* 
----------------
READ ENVELOPES OF THE GIVEN ENVELOPE GROUP
----------------
*/
exports.getEnvelopes = async (req, res) => {
  const { groupId } = req.query;

  // validate request
  if (!groupId) return res.status(400).send('groupId required');

  // check if resource(s) referenced exist
  const group = await db.groups.findOne({
    where: { 
      id: groupId
    }
  });
  if (!group) {
    console.log('[Envelope Controller] Invalid Request: The requested resource could not be found');
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
    console.log('[Envelope Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[Envelope Controller] Getting envelopes...');
  const envelopesRes = await db.envelopes.findAll({
    where: { 
      group_id: groupId
    }
  });
  console.log('[Envelope Controller] Done');
  return res.send(envelopesRes);

};

/* 
----------------
UPDATE ENVELOPE
----------------
*/
exports.updateEnvelope = async (req, res) => {
  const { envelopeId } = req.params;
  const { groupId, type, label, amountPlanned, isStarred, dueDate, startingBalance, savingsGoal, notes } = req.body;

  // validate request
  if (!envelopeId) {
    console.log('[Envelope Conroller] envelopeId required to update an envelope');
    return res.status(400).send('envelopeId required to update an envelope');
  }
  if (!groupId && !type && !label && !amountPlanned && !isStarred && !dueDate && !startingBalance && !savingsGoal && !notes) {
    console.log('[Envelope Conroller] At least one of the following properties is required to update an envelope: groupId, type, label, amountPlanned, isStarred, dueDate, startingBalance, savingsGoal, notes');
    return res.status(400).send('At least one of the following properties is required to update an envelope: groupId, type, label, amountPlanned, isStarred, dueDate, startingBalance, savingsGoal, notes');
  }
  if (type && !validTypes.includes(type)) {
    return res.status(400).send('invalid type provided');
  }
  if (amountPlanned < 1) {
    return res.status(400).send('amountPlanned must be a nonzero positive integer');
  }
  if (isStarred && isStarred !== false && isStarred !== true) {
    return res.status(400).send('isStarred must be a boolean');
  }
  if (savingsGoal < 1) {
    return res.status(400).send('savingsGoal must be a nonzero positive integer');
  }

  // check if resource(s) referenced exist
  const envelope = await db.envelopes.findOne({
    where: {
      id: envelopeId
    }
  });
  if (!envelope) {
    console.log('[Envelope Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }
  let newGroup;
  if (groupId) {
    newGroup = await db.groups.findOne({
      where: {
        id: groupId
      }
    });
    if (!newGroup) {
      console.log('[Envelope Controller] Invalid Request: The requested resource could not be found');
      return res.status(404).send();
    }
  } 
  
  // validate permissions
  const group = await db.groups.findOne({
    where: {
      id: envelope.group_id
    }
  });
  const budgetMonth = await db.budgetMonths.findOne({
    where: {
      id: group.budget_month_id
    }
  });
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  let newGroupBudgetMonth, permGranted = false, newGroupBudgetId;
  if (groupId) {
    newGroupBudgetMonth = await db.budgetMonths.findOne({
      where: { 
        id: newGroup.budget_month_id
      }
    });
    newGroupBudgetId = newGroupBudgetMonth.budget_id;
    permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id) && budgetIdsPermitted.includes(newGroupBudgetId);
  } else {
    permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  }
  if (!permGranted) {
    console.log('[Envelope Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  
  // perform request
  console.log('\n[Envelope Controller] Updating envelope...');
  const updateRes = await db.envelopes.update(
    {
      group_id: groupId,
      type: type,
      label: label,
      amount_planned: amountPlanned,
      is_starred: isStarred,
      due_date: dueDate,
      starting_balance: startingBalance,
      savings_goal: savingsGoal,
      notes: notes
    },
  {
    where: {
      id: envelopeId
    }
  }
  );
  if (updateRes != 1) { // not using !== because typeof updateRes is object with int
    console.log('[Envelope Controller] Error: The requested resource could not be updated');
    return res.status(500).send();
  }
  console.log('[Envelope Controller] Done: Updated the requested resource');
  return res.status(204).send(); // No Content

};

/* 
----------------
DELETE AN ENVELOPE
----------------
*/
exports.deleteEnvelope = async (req, res) => {
  const { envelopeId } = req.params;

  // validate request
  if (!envelopeId) {
    console.log('[Envelope Controller] envelopeId required to delete envelope');
    return res.status(400).send('envelopeId required to delete envelope');
  }

  // check if resource(s) referenced exist
  const envelope = await db.envelopes.findOne({
    where: {
      id: envelopeId
    }
  });
  if (!envelope) {
    console.log('[Envelope Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  const group = await db.groups.findOne({
    where: {
      id: envelope.group_id
    }
  });
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  if (!permGranted) {
    console.log('[Envelope Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[Envelope Controller] Deleting envelope...');
  const deleteRes = await db.envelopes.destroy({
    where: {
      id: envelopeId
    }
  });
  if (deleteRes != 1) { // not using !== because typeof deleteRes is object with int
    console.log('[Envelope Controller] Error: The requested resource could not be deleted');
    return res.status(500).send();
  }
  console.log('[Envelope Controller] Done: Deleted the requested resource');
  return res.status(204).send(); // No Content

};