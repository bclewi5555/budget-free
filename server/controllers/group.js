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
READ GROUPS (OF ENVELOPES) OF THE GIVEN BUDGET MONTH
----------------
*/
exports.getGroups = async (req, res) => {
  if (!req.query.budgetMonthId) return res.status(400).send('budgetMonthId required');
  console.log('\n[Group Controller] Getting groups...');

  // Check if authUser perms include budgetId of given budgetMonth
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  console.log('[Group Controller] budgetIdsPermitted: '+budgetIdsPermitted);

  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: req.query.budgetMonthId
    }
  });
  console.log('[Group Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  console.log('[Group Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[Group Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  console.log('[Group Controller] Permission to the requested resource granted.');

  // Get all budgetMonths for the given budgetId if permitted
  const groupsRes = await db.groups.findAll({
    where: { 
      budget_month_id: req.query.budgetMonthId
    }
  });
  console.log('[Group Controller] Done: '+JSON.stringify(groupsRes));
  return res.send(groupsRes);

};
