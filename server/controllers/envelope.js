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

/* 
----------------
READ ENVELOPES OF THE GIVEN ENVELOPE GROUP
----------------
*/
exports.getEnvelopes = async (req, res) => {
  if (!req.query.groupId) return res.status(400).send('groupId required');
  console.log('\n[Envelope Controller] Getting envelopes...');

  // Check if authUser perms include budgetId associated with the given group
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  console.log('[Envelope Controller] budgetIdsPermitted: '+budgetIdsPermitted);

  const group = await db.groups.findOne({
    where: {
      id: req.query.groupId
    }
  });
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  console.log('[Envelope Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  console.log('[Envelope Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Envelope Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  console.log('[Envelope Controller] Permission to the requested resource granted.');

  // Get all envelopes for the given groupId if permitted
  const envelopesRes = await db.envelopes.findAll({
    where: { 
      group_id: req.query.groupId
    }
  });
  console.log('[Envelope Controller] Done: '+JSON.stringify(envelopesRes));
  return res.send(envelopesRes);

};

/* 
----------------
CREATE NEW ENVELOPE IN THE GIVEN GROUP
----------------
*/
exports.createEnvelope = async (req, res) => {

  // validate request
  if (!req.body.groupId || !req.body.type || !req.body.label) {
    console.log('[Envelope Conroller] groupID, type and label required to create an envelope');
    return res.status(400).send('groupID, type and label required to create an envelope');
  }
  // Check if authUser perms include budgetId associated with the given group
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  console.log('[Envelope Controller] budgetIdsPermitted: '+budgetIdsPermitted);

  const group = await db.groups.findOne({
    where: {
      id: req.body.groupId
    }
  });
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  console.log('[Envelope Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  console.log('[Envelope Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Envelope Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  console.log('[Envelope Controller] Permission to the requested resource granted.');

  console.log('[Envelope Controller] Creating envelope...');
  // create new envelope
  /*
  if (!req.body.amountPlanned) req.body.amountPlanned = null
  if (!req.body.isStarred) req.body.isStarred = null;
  if (!req.body.dueDate) req.body.dueDate = null;
  if (!req.body.startingBalance) req.body.startingBalance = null;
  if (!req.body.savingsGoal) req.body.savingsGoal = null;
  if (!req.body.notes) req.body.notes = null;
  */
  const newEnvelope = await db.envelopes.create({
    group_id: req.body.groupId,
    type: req.body.type,
    label: req.body.label,
    amount_planned: req.body.amountPlanned,
    is_starred: req.body.isStarred,
    due_date: req.body.dueDate,
    starting_balance: req.body.startingBalance,
    savings_goal: req.body.savingsGoal,
    notes: req.body.notes
  });
  console.log('[Envelope Controller] Done: Created new envelope with id: '+newEnvelope.id);
  return res.status(200).send(newEnvelope);

};

/* 
----------------
DELETE AN ENVELOPE
----------------
*/
exports.deleteEnvelope = async (req, res) => {

  // validate request
  if (!req.params.envelopeId) {
    console.log('[Envelope Controller] envelopeId required to delete envelope');
    return res.status(400).send('envelopeId required to delete envelope');
  }
  console.log('[Envelope Controller] req.params.envelopeId: '+req.params.envelopeId);
  // Check if authUser perms include budgetId associated with the given envelope
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[Envelope Controller] budgetIdsPermitted: '+budgetIdsPermitted);

  //console.log('[Envelope Controller] req.params.envelopeId: '+req.params.envelopeId);
  const envelope = await db.envelopes.findOne({
    where: {
      id: req.params.envelopeId
    }
  });
  //console.log('[Envelope Controller] envelope.group_id: '+envelope.group_id);
  const group = await db.groups.findOne({
    where: {
      id: envelope.group_id
    }
  });
  //console.log('[Envelope Controller] group.budget_month_id: '+group.budget_month_id);
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

  console.log('\n[Envelope Controller] Deleting envelope...');
  const deleteRes = await db.envelopes.destroy({
    where: {
      id: req.params.envelopeId
    }
  });
  if (deleteRes !== 1) {
    console.log('[Envelope Controller] Error: The requested resource could not be deleted');
    return res.status(500).send();
  }
  console.log('[Envelope Controller] Done: Deleted the requested resource');
  return res.status(204).send(); // No Content

};