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
READ BUDGETS OF THE AUTHENTICATED USER
----------------
*/
exports.getBudgets = async (req, res) => {
  console.log('\n[Budget Controller] Getting budgets...');

  const budgetIds = [];
  res.locals.perms.map(perm => {
    budgetIds.push(perm.budgetId);
  });
  console.log('[Budget Controller] budgetIds: '+budgetIds);

  // Get all budgets which the authenticated user has permission to
  const budgetsRes = await db.budgets.findAll({
    where: { 
      id: { [Op.or]: budgetIds }
    }
  });
  console.log('[Budget Controller] Done: '+JSON.stringify(budgetsRes));
  return res.send(budgetsRes);

};
