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
