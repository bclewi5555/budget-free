/*
======================================================
BudgetMonth controller
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
READ BUDGET MONTHS OF THE GIVEN BUDGET OF THE AUTHENTICATED USER
----------------
*/
exports.getBudgetMonths = async (req, res) => {
  const { budgetId } = req.query;

  // validate request
  if (!budgetId) {
    console.log('[BudgetMonth Controller] budgetId required to query budgetMonth');
    return res.status(400).send('budgetId required to query budgetMonth');
  }

  // check if resource(s) referenced exist
  const budget = await db.budgets.findOne({
    where: {
      id: budgetId
    }
  });
  if (!budget) {
    console.log('[BudgetMonth Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  const permGranted = budgetIdsPermitted.includes(budgetId);
  if (!permGranted) {
    console.log('[BudgetMonth Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[BudgetMonth Controller] Getting budgetMonths...');
  const budgetMonthsRes = await db.budgetMonths.findAll({
    where: { 
      budget_id: budgetId
    }
  });
  console.log('[BudgetMonth Controller] Done: '+JSON.stringify(budgetMonthsRes));
  return res.send(budgetMonthsRes);

};

/* 
----------------
CREATE NEW BUDGET MONTH
----------------
*/
exports.createBudgetMonth = async (req, res) => {
  const { budgetId, year, month } = req.body;

  // validate request
  if (!budgetId || !year || !month) {
    return res.status(400).send('budgetId, year and month are required to create a budgetMonth');
  }
  if (year < 1) {
    return res.status(401).send('year must be a positive integer greater than 0');
  }
  if (month < 1 || month > 12) {
    return res.status(401).send('month must be an integer between 1 and 12 (inclusive)');
  }

  // check if resource(s) referenced exist
  const budget = await db.budgets.findOne({
    where: {
      id: budgetId
    }
  });
  if (!budget) {
    console.log('[BudgetMonth Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  const permGranted = budgetIdsPermitted.includes(budgetId);
  if (!permGranted) {
    console.log('[BudgetMonth Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[BudgetMonth Controller] Creating new budgetMonth...');
  const dateInteger = parseInt(''+year+month);
  const newBudgetMonth = await db.budgetMonths.create({
    budget_id: budgetId,
    date_integer: dateInteger
  });
  console.log('[BudgetMonth Controller] Done: New budgetMonth created with id: '+newBudgetMonth.id);
  return res.status(200).send(newBudgetMonth);

}

/* 
----------------
DELETE A BUDGET MONTH
----------------
*/
exports.deleteBudgetMonth = async (req, res) => {
  const { budgetMonthId } = req.params;

  // validate request
  if (!budgetMonthId) {
    console.log('[BudgetMonth Controller] budgetMonthId required to delete budgetMonth');
    return res.status(400).send('budgetMonthId required to delete budgetMonth');
  }

  // check if resource(s) referenced exist
  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: budgetMonthId
    }
  });
  if (!budgetMonth) {
    console.log('[BudgetMonth Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  if (!permGranted) {
    console.log('[BudgetMonth Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }

  // perform request
  console.log('\n[BudgetMonth Controller] Deleting budgetMonth...');
  const deleteRes = await db.budgetMonths.destroy({
    where: {
      id: budgetMonthId
    }
  });
  if (deleteRes != 1) { // not using !== because typeof deleteRes is object with int
    console.log('[BudgetMonth Controller] Error: The requested resource could not be deleted');
    return res.status(500).send();
  }
  console.log('[BudgetMonth Controller] Done: Deleted the requested resource');
  return res.status(204).send(); // No Content

};