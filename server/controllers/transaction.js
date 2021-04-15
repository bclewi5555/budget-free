/*
======================================================
Transaction controller
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
READ TRANSACTIONS OF THE GIVEN ENVELOPE
----------------
*/
exports.getTransactions = async (req, res) => {
  if (!req.query.envelopeId) return res.status(400).send('envelopeId required');
  console.log('\n[Transaction Controller] Getting transactions...');

  // Check if authUser perms include budgetId associated with the given envelope
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  console.log('[Transaction Controller] budgetIdsPermitted: '+budgetIdsPermitted);

  console.log('[Transaction Controller] req.query.envelopeId: '+req.query.envelopeId);
  const envelope = await db.envelopes.findOne({
    where: {
      id: req.query.envelopeId
    }
  });
  console.log('[Transaction Controller] envelope.group_id: '+envelope.group_id);
  const group = await db.groups.findOne({
    where: {
      id: envelope.group_id
    }
  });
  console.log('[Transaction Controller] group.budget_month_id: '+group.budget_month_id);
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  console.log('[Transaction Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  console.log('[Transaction Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Transaction Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  console.log('[Transaction Controller] Permission to the requested resource granted.');

  // Get all transactions for the given envelopeId if permitted
  const transactionsRes = await db.transactions.findAll({
    where: { 
      envelope_id: req.query.envelopeId
    }
  });
  console.log('[Transaction Controller] Done: '+JSON.stringify(transactionsRes));
  return res.send(transactionsRes);

};

/* 
----------------
CREATE NEW TRANSACTION IN THE GIVEN ENVELOPE
----------------
*/
exports.createTransaction = async (req, res) => {

  // validate request
  if (!req.body.envelopeId || !req.body.type || !req.body.amount || !req.body.date || !req.body.label) {
    console.log('[Transaction Controller] envelopeId, type, amount, date and label required to create new transaction');
    return res.status(400).send('envelopeId, type, amount, date and label required to create new transaction')
  }
  // Check if authUser perms include budgetId associated with the given envelope
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  console.log('[Transaction Controller] budgetIdsPermitted: '+budgetIdsPermitted);

  console.log('[Transaction Controller] req.query.envelopeId: '+req.body.envelopeId);
  const envelope = await db.envelopes.findOne({
    where: {
      id: req.body.envelopeId
    }
  });
  console.log('[Transaction Controller] envelope.group_id: '+envelope.group_id);
  const group = await db.groups.findOne({
    where: {
      id: envelope.group_id
    }
  });
  console.log('[Transaction Controller] group.budget_month_id: '+group.budget_month_id);
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  console.log('[Transaction Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  console.log('[Transaction Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Transaction Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  console.log('[Transaction Controller] Permission to the requested resource granted.');
  /*
  if (!req.body.referenceNumber) req.body.referenceNumber = null;
  if (!req.body.notes) req.body.notes = null;
  */
  const newTransaction = await db.transactions.create({
    envelope_id: req.body.envelopeId,
    type: req.body.type,
    amount: req.body.amount,
    date: req.body.date,
    label: req.body.label,
    reference_number: req.body.referenceNumber,
    notes: req.body.notes
  });
  console.log('[Transaction Controller] Done: Created new transaction with id: '+newTransaction.id);
  return res.status(200).send(newTransaction);

}

/* 
----------------
DELETE A TRANSACTION
----------------
*/
exports.deleteTransaction = async (req, res) => {

  // validate request
  if (!req.params.transactionId) {
    console.log('[Transaction Controller] transactionId required to delete transaction');
    return res.status(400).send('transactionId required to delete transaction');
  }
  //console.log('[Transaction Controller] req.params.transactionId: '+req.params.transactionId);
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[Transaction Controller] budgetIdsPermitted: '+budgetIdsPermitted);
  const transaction = await db.transactions.findOne({
    where: {
      id: req.params.transactionId
    }
  });
  //console.log('[Transaction Controller] transaction.envelope_id: '+transaction.envelope_id);
  const envelope = await db.envelopes.findOne({
    where: {
      id: transaction.envelope_id
    }
  });
  //console.log('[Transaction Controller] envelope.group_id: '+envelope.group_id);
  const group = await db.groups.findOne({
    where: {
      id: envelope.group_id
    }
  });
  //console.log('[Transaction Controller] group.budget_month_id: '+group.budget_month_id);
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: group.budget_month_id
    }
  });
  //console.log('[Transaction Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  //console.log('[Transaction Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Transaction Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  //console.log('[Transaction Controller] Permission to the requested resource granted.');

  console.log('\n[Transaction Controller] Deleting transaction...');
  const deleteRes = await db.transactions.destroy({
    where: {
      id: req.params.transactionId
    }
  });
  if (deleteRes !== 1) {
    console.log('[Transaction Controller] Error: The requested resource could not be deleted');
    return res.status(500).send();
  }
  console.log('[Transaction Controller] Done: Deleted the requested resource');
  return res.status(204).send(); // No Content

};