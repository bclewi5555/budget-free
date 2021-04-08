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
