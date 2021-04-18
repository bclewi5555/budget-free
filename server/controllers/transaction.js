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

const validTypes = ['income', 'expense', 'transfer'];

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
  if (!validTypes.includes(req.body.type)) {
    return res.status(400).send('invalid type provided');
  }

  // check if resource(s) referenced exist
  const envelope = await db.envelopes.findOne({
    where: {
      id: req.body.envelopeId
    }
  });
  if (!envelope) {
    console.log('[Transaction Controller] The requested resource could not be found');
    return res.status(404).send('The requested resource was not found');
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
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  if (!permGranted) {
    console.log('[Transaction Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  const newTransaction = await db.transactions.create({
    envelope_id: req.body.envelopeId,
    type: req.body.type,
    amount: req.body.amount,
    date: req.body.date,
    label: req.body.label,
    reference_number: req.body.referenceNumber,
    notes: req.body.notes
  });
  if (!newTransaction) {
    console.log('[Transaction Controller] Failed: The transaction could not be created');
    return res.status(500).send('The transaction could not be created');
  }
  console.log('[Transaction Controller] Done: Created new transaction with id: '+newTransaction.id);
  return res.status(200).send(newTransaction);

}

/* 
----------------
READ TRANSACTIONS OF THE GIVEN ENVELOPE
----------------
*/
exports.getTransactions = async (req, res) => {

  // validate request
  if (!req.query.envelopeId) return res.status(400).send('envelopeId required');

  // check if resource(s) referenced exist
  const envelope = await db.envelopes.findOne({
    where: {
      id: req.query.envelopeId
    }
  });
  if (!envelope) {
    console.log('[Transaction Controller] The requested resource could not be found');
    return res.status(404).send('The requested resource was not found');
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
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  if (!permGranted) {
    console.log('[Transaction Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[Transaction Controller] Getting transactions...');
  const transactionsRes = await db.transactions.findAll({
    where: { 
      envelope_id: req.query.envelopeId
    }
  });
  if (!transactionsRes) {
    console.log('[Transaction Controller] Failed: Could not read the requested transactions');
    return res.status(500).send('Could not read the requested transactions');
  }
  console.log('[Transaction Controller] Done');
  return res.send(transactionsRes);

};

/* 
----------------
UPDATE TRANSACTION
----------------
*/
exports.updateTransaction = async (req, res) => {

  // validate request
  if (
    !req.body.envelopeId && 
    !req.body.type && 
    !req.body.amount && 
    !req.body.date && 
    !req.body.label && 
    !req.body.referenceNumber &&
    !req.body.notes
    ) {
    console.log('[Transaction Controller] Invalid Request: At least one property is required to update a transaction: envelopeId, type, amount, date, label, referenceNumber, notes');
    return res.status(400).send('At least one property is required to update a transaction: envelopeId, type, amount, date, label, referenceNumber, notes')
  }
  if (!validTypes.includes(req.body.type)) {
    return res.status(400).send('invalid type provided');
  }

  // check if resource(s) referenced exist
  const transaction = await db.transactions.findOne({
    where: {
      id: req.params.transactionId
    }
  });
  if (!transaction) {
    console.log('[Transaction Controller] The requested resource could not be found');
    return res.status(404).send('The requested resource was not found');
  }
  let newEnvelope;
  if (req.body.envelopeId) {
    newEnvelope = await db.envelopes.findOne({
      where: {
        id: req.body.envelopeId
      }
    });
    if (!newEnvelope) {
      console.log('[Transaction Controller] The requested resource could not be found');
      return res.status(404).send('The requested resource was not found');
    }
  }

  // validate permissions
  const envelope = await db.envelopes.findOne({
    where: {
      id: transaction.envelope_id
    }
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
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  let permGranted;
  if (req.body.envelopeId) {
    const newEnvelopeGroup = await db.groups.findOne({
      where: {
        id: newEnvelope.group_id
      }
    });
    const newEnvelopeBudgetMonth = await db.budgetMonths.findOne({
      where: {
        id: newEnvelopeGroup.budget_month_id
      }
    });
    permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id) && budgetIdsPermitted.includes(newEnvelopeBudgetMonth.budget_id);
  } else {
    permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  }
  if (!permGranted) {
    console.log('[Transaction Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[Transaction Controller] Updating transaction...');
  const newTransaction = await db.transactions.update(
    {
      envelope_id: req.body.envelopeId,
      type: req.body.type,
      amount: req.body.amount,
      date: req.body.date,
      label: req.body.label,
      reference_number: req.body.referenceNumber,
      notes: req.body.notes
    },
    {
      where: {
        id: req.params.transactionId
      }
    }
  );
  if (newTransaction != 1) { // not using !== because typeof updateteRes is object with int
    console.log('[Transaction Controller] Failed: The requested resource could not be updated.');
    return res.status(500).send('The requested resource could not be updated.');
  }
  console.log('[Transaction Controller] Done: updated transaction');
  return res.status(204).send(); // no content

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

  // check if resource(s) referenced exist
  const transaction = await db.transactions.findOne({
    where: {
      id: req.params.transactionId
    }
  });
  if (!transaction) {
    console.log('[Transaction Controller] The requested resource could not be found');
    return res.status(404).send('The requested resource was not found');
  }

  // validate permissions
  const envelope = await db.envelopes.findOne({
    where: {
      id: transaction.envelope_id
    }
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
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  if (!permGranted) {
    console.log('[Transaction Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[Transaction Controller] Deleting transaction...');
  const deleteRes = await db.transactions.destroy({
    where: {
      id: req.params.transactionId
    }
  });
  if (deleteRes != 1) { // not using !== because typeof deleteRes is object with int
    console.log('[Transaction Controller] Error: The requested resource could not be deleted');
    return res.status(500).send();
  }
  console.log('[Transaction Controller] Done: Deleted the requested resource');
  return res.status(204).send(); // No Content

};