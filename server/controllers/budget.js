/*
======================================================
Budget controller
======================================================
*/

// Model dependencies
const { sequelize } = require('../models/db');
const db = require('../models/db');

/*
Sequelize Operators for queries
https://sequelize.org/master/variable/index.html#static-variable-Op
*/
const Op = db.Sequelize.Op;

/* 
----------------
CREATE NEW BUDGET FOR THE AUTHENTICATED USER
----------------
*/
exports.createBudget = async (req, res) => {
  const { label } = req.body;

  // validate request
  if (!label) {
    console.log('[Budget Controller] label required to create new budget');
    return res.status(400).send('label required to create new budget');
  }

  // perform request
  console.log('\n[Budget Controller] Creating new budget...');
  const newBudget = await db.budgets.create({
    label: label
  });
  const newPerm = await db.permissions.create({
    budget_id: newBudget.id,
    user_id: res.locals.authUser.id,
    is_owner: true,
    is_admin: true
  });
  console.log('[Budget Controller] Done: New budget created with id: '+newBudget.id);
  return res.status(200).send({
    newBudget: newBudget,
    newPerm: newPerm
  });
}

/* 
----------------
CREATE AND POPULATE STARTER BUDGET FROM TEMPLATE
----------------
*/
exports.createBudgetFromTemplate = async (req, res) => {
  const { monthlyIncome } = req.body;

  // validate request
  if (!monthlyIncome) {
    console.log('[Budget Controller] monthlyIncome required to create new budget from starter template');
    return res.status(400).send('monthlyIncome required to create new budget from starter template');
  }

  // create budget and permissions
  console.log('\n[Budget Controller] Creating starter budget...');
  const newBudget = await db.budgets.create({
    label: 'Home'
  });
  if (!newBudget) {
    console.log('[Budget Controller] Failed: Could not create new budget');
    return res.status(500).error('Could not create new budget');
  }
  const newPerm = await db.permissions.create({
    budget_id: newBudget.id,
    user_id: res.locals.authUser.id,
    is_owner: true,
    is_admin: true
  });
  if (!newPerm) {
    console.log('[Budget Controller] Failed: Could not create new set of permissions');
    return res.status(500).error('Could not create new set of permissions');
  }
  const updateDefaultBudgetRes = await db.users.update(
    { default_budget_id: newBudget.id },
    { where: { id: res.locals.authUser.id }}
  );
  if (!updateDefaultBudgetRes) {
    console.log('[Budget Controller] Failed: Could not update defaultBudgetId');
    return res.status(500).error('Could not update defaultBudgetId');
  }
  console.log('[Budget Controller] New budget created with id: '+newBudget.id);

  // create current budgetMonth
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth()+1; // zero indexed (0-11)
  const dateInteger = parseInt(''+currYear+currMonth);
  const newBudgetMonth = await db.budgetMonths.create({
    budget_id: newBudget.id,
    date_integer: dateInteger
  });
  if (!newBudgetMonth) {
    console.log('[Budget Controller] Failed: Could not create new budgetMonth');
    return res.status(500).error('Could not create new budgetMonth');
  }

  // create groups
  const newIncomeGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Income'
  });
  const newTaxesGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Taxes'
  });
  const newGivingGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Giving'
  });
  const newFoodGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Food'
  });
  const newHousingGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Housing'
  });
  const newUtilitiesGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Utilities'
  });
  const newTransportationGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Transportation'
  });
  const newInsuranceGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Insurance'
  });
  const newSavingsGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Savings'
  });
  const newPersonalGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Personal'
  });
  const newHealthGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Health'
  });
  const newRecreationGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Recreation'
  });
  const newDebtGroup = await db.groups.create({
    budget_month_id: newBudgetMonth.id,
    label: 'Debt'
  });
  if (
    !newIncomeGroup ||
    !newTaxesGroup ||
    !newGivingGroup ||
    !newFoodGroup ||
    !newHousingGroup ||
    !newUtilitiesGroup ||
    !newTransportationGroup ||
    !newInsuranceGroup ||
    !newSavingsGroup ||
    !newPersonalGroup ||
    !newHealthGroup ||
    !newRecreationGroup ||
    !newDebtGroup
    ) {
    console.log('[Budget Controller] Failed: Could not create new groups');
    return res.status(500).error('Could not create new groups');
  }
  
  // create envelopes
  const MONTHLY_INCOME = monthlyIncome * 100; // $DDDD.CC when formatted, but stored/typed as an integer
  const newPaycheck1Envelope = await db.envelopes.create({
    group_id: newIncomeGroup.id,
    type: 'income',
    label: 'Paycheck 1',
    amount_planned: MONTHLY_INCOME / 2
  });
  const newPaycheck2Envelope = await db.envelopes.create({
    group_id: newIncomeGroup.id,
    type: 'income',
    label: 'Paycheck 2',
    amount_planned: MONTHLY_INCOME / 2
  });
  const newIncomeTaxEnvelope = await db.envelopes.create({
    group_id: newTaxesGroup.id,
    type: 'default',
    label: 'Income Tax',
    amount_planned: MONTHLY_INCOME / 10
  });
  const newTaxPrepFeesEnvelope = await db.envelopes.create({
    group_id: newTaxesGroup.id,
    type: 'sinking',
    label: 'Tax Prep Fees',
    amount_planned: MONTHLY_INCOME / 20 / 12
  });
  const newMedicalInsuranceEnvelope = await db.envelopes.create({
    group_id: newInsuranceGroup.id,
    type: 'default',
    label: 'Medical Insurance',
    amount_planned: MONTHLY_INCOME / 20 / 5
  });
  const newAutoInsuranceEnvelope = await db.envelopes.create({
    group_id: newInsuranceGroup.id,
    type: 'default',
    label: 'Auto Insurance',
    amount_planned: MONTHLY_INCOME / 20 / 5
  });
  const newLifeInsuranceEnvelope = await db.envelopes.create({
    group_id: newInsuranceGroup.id,
    type: 'default',
    label: 'Life Insurance',
    amount_planned: MONTHLY_INCOME / 20 / 5
  });
  const newRentersInsuranceEnvelope = await db.envelopes.create({
    group_id: newInsuranceGroup.id,
    type: 'sinking',
    label: 'Renters Insurance',
    amount_planned: MONTHLY_INCOME / 20 / 5,
    notes: 'paid annually'
  });
  const newIdTheftProtectionEnvelope = await db.envelopes.create({
    group_id: newInsuranceGroup.id,
    type: 'sinking',
    label: 'Identity Theft Protection',
    amount_planned: MONTHLY_INCOME / 20 / 5,
    notes: 'paid annually'
  });
  const newEmergencyFundEnvelope = await db.envelopes.create({
    group_id: newSavingsGroup.id,
    type: 'sinking',
    label: 'Emergency Fund',
    amount_planned: MONTHLY_INCOME / 10
  });
  const newCharityEnvelope = await db.envelopes.create({
    group_id: newGivingGroup.id,
    type: 'sinking',
    label: 'Charity',
    amount_planned: MONTHLY_INCOME / 10
  });
  const newGasEnvelope = await db.envelopes.create({
    group_id: newTransportationGroup.id,
    type: 'default',
    label: 'Gas',
    amount_planned: MONTHLY_INCOME / 20
  });
  const newMaintenanceEnvelope = await db.envelopes.create({
    group_id: newTransportationGroup.id,
    type: 'sinking',
    label: 'Maintenance',
    amount_planned: MONTHLY_INCOME / 20
  });
  const newRentEnvelope = await db.envelopes.create({
    group_id: newHousingGroup.id,
    type: 'default',
    label: 'Rent',
    amount_planned: MONTHLY_INCOME / 4
  });
  const newPowerEnvelope = await db.envelopes.create({
    group_id: newUtilitiesGroup.id,
    type: 'default',
    label: 'Power',
    amount_planned: MONTHLY_INCOME / 20 / 4
  });
  const newWaterSewerEnvelope = await db.envelopes.create({
    group_id: newUtilitiesGroup.id,
    type: 'default',
    label: 'Water/Sewer',
    amount_planned: MONTHLY_INCOME / 20 / 4
  });
  const newInternetEnvelope = await db.envelopes.create({
    group_id: newUtilitiesGroup.id,
    type: 'default',
    label: 'Internet',
    amount_planned: MONTHLY_INCOME / 20 / 4
  });
  const newCellPhoneEnvelope = await db.envelopes.create({
    group_id: newUtilitiesGroup.id,
    type: 'default',
    label: 'Cell Phone',
    amount_planned: MONTHLY_INCOME / 20 / 4
  });
  const newGroceriesEnvelope = await db.envelopes.create({
    group_id: newFoodGroup.id,
    type: 'default',
    label: 'Groceries',
    amount_planned: MONTHLY_INCOME / 10
  });
  const newRestaurantsEnvelope = await db.envelopes.create({
    group_id: newFoodGroup.id,
    type: 'default',
    label: 'Restaurants',
    amount_planned: MONTHLY_INCOME / 20
  });
  const newHSAEnvelope = await db.envelopes.create({
    group_id: newHealthGroup.id,
    type: 'sinking',
    label: 'Health Savings Account',
    amount_planned: MONTHLY_INCOME / 20
  });
  const newSelfDefenseMembershipEnvelope = await db.envelopes.create({
    group_id: newRecreationGroup.id,
    type: 'default',
    label: 'Self Defense Membership',
    amount_planned: MONTHLY_INCOME / 40
  });
  const newClothingEnvelope = await db.envelopes.create({
    group_id: newPersonalGroup.id,
    type: 'sinking',
    label: 'Clothing',
    amount_planned: MONTHLY_INCOME / 40
  });
  const newBooksEnvelope = await db.envelopes.create({
    group_id: newPersonalGroup.id,
    type: 'sinking',
    label: 'Books',
    amount_planned: MONTHLY_INCOME / 40
  });
  if (
    !newPaycheck1Envelope ||
    !newPaycheck2Envelope ||
    !newIncomeTaxEnvelope ||
    !newTaxPrepFeesEnvelope ||
    !newMedicalInsuranceEnvelope ||
    !newAutoInsuranceEnvelope ||
    !newLifeInsuranceEnvelope ||
    !newRentersInsuranceEnvelope ||
    !newIdTheftProtectionEnvelope ||
    !newEmergencyFundEnvelope ||
    !newCharityEnvelope ||
    !newGasEnvelope ||
    !newMaintenanceEnvelope ||
    !newRentEnvelope ||
    !newPowerEnvelope ||
    !newWaterSewerEnvelope ||
    !newInternetEnvelope ||
    !newCellPhoneEnvelope ||
    !newGroceriesEnvelope ||
    !newRestaurantsEnvelope ||
    !newHSAEnvelope ||
    !newSelfDefenseMembershipEnvelope ||
    !newClothingEnvelope ||
    !newBooksEnvelope
    ) {
    console.log('[Budget Controller] Failed: Could not create new envelopes');
    return res.status(500).error('Could not create new envelopes');
  }

  console.log('[Budget Controller] Done: Starter budget created from template with id: '+newBudget.id);
  return res.status(200).json({newBudgegtId: newBudget.id});
}

/* 
----------------
READ BUDGETS OF THE AUTHENTICATED USER
----------------
*/
exports.getBudgets = async (req, res) => {

  // request already validated

  // no resources referenced
  
  // Get all budgets which the authenticated user has permission to
  console.log('\n[Budget Controller] Getting budgets...');
  if (res.locals.perms.length < 1) {
    console.log('[Budget Controller] Done: No budgets');
    return res.status(200).send([]);
  }
  const budgetIds = [];
  res.locals.perms.map(perm => {
    budgetIds.push(perm.budgetId);
  });
  const budgetsRes = await db.budgets.findAll({
    where: { 
      id: { [Op.or]: budgetIds }
    }
  });
  console.log('[Budget Controller] Done');
  return res.status(200).send(budgetsRes);

};

/* 
----------------
GET SUMMARY OF THE GIVEN BUDGET (FOR SUMMARY CHART)
----------------
*/
exports.getBudgetMonthSummary = async (req, res) => {
  const { budgetId, budgetMonthId } = req.params;

  // validate request
  if (!budgetId) {
    console.log('[Budget Controller] budgetId required to get budget summary');
    return res.status(400).send('budgetId required to get budget summary');
  }
  if (!budgetMonthId) {
    console.log('[Budget Controller] budgetMonthId required to get budget summary');
    return res.status(400).send('budgetMonthId required to get budget summary');
  }

  // check if resource(s) referenced exist
  const budgetRes = await db.budgets.findOne({
    where: {
      id: budgetId
    }
  });
  if (!budgetRes) {
    console.log('[Budget Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }
  const budgetMonthRes = await db.budgetMonths.findOne({
    where: {
      id: budgetMonthId
    }
  });
  if (!budgetMonthRes) {
    console.log('[Budget Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  if (!budgetIdsPermitted.includes(budgetId)) {
    console.log('[Budget Controller] Permission to the requested resource denied');
    return res.status(401).send('Permission to the requested resource denied'); // unauthorized
  }
  
  // perform request

  // get summary data for budgetMonth
  console.log('\n[Budget Controller] Getting budgetMonthSummary...');
  const groupsRes = await db.groups.findAll(
    { where: { budget_month_id: budgetMonthRes.id }}
  );
  if (!groupsRes) {
    console.log('[Group Controller] Failed: groups could not be found');
    return res.status(404).send('groups could not be found');
  }
  const defaultGroups = [], groupIds = [], incomeGroupIds = [], incomeEnvelopeIds = [];
  groupsRes.map(group => {
    if (group.type === 'default') { // exclude income group
      groupIds.push(group.id); // for summary
      defaultGroups.push({ 
        id: group.id, // for each group
        label: group.label,
        planned: 0,
        spent: 0,
        remaining: 0,
        envelopeIds: []
      });
    } else {
      incomeGroupIds.push(group.id);
    }
  });

  const envelopeIds = []; // for summary
  const envelopesRes = await db.envelopes.findAll(
    { where: { group_id: { [Op.or]: [groupIds, incomeGroupIds] }}}
  );
  if (!envelopesRes) {
    console.log('[Group Controller] Failed: envelopes could not be found');
    return res.status(404).send('envelopes could not be found');
  }
  envelopesRes.forEach(envelope => {
    if (incomeGroupIds.includes(envelope.group_id)) {
      incomeEnvelopeIds.push(envelope.id);
    } else {
      envelopeIds.push(envelope.id);
    }
  });

  const incomeRes = await db.envelopes.findAll({
    attributes: [[sequelize.fn('SUM', sequelize.col('amount_planned')), 'income']],
    where: {
      group_id: { [Op.or]: incomeGroupIds }
    },
    raw: true
  });
  if (incomeRes[0].income == null) {
    console.log('[Group Controller] Failed: envelope planned income could not be found');
    return res.status(404).send('envelope planned income could not be found');
  }

  const budgetedRes = await db.envelopes.findAll({
    attributes: [[sequelize.fn('SUM', sequelize.col('amount_planned')), 'budgeted']],
    where: { 
      group_id: { [Op.or]: groupIds }
    },
    raw: true
  });
  if (budgetedRes[0].budgeted == null) {
    console.log('[Group Controller] Failed: envelope planned income could not be found');
    return res.status(404).send('envelope planned income could not be found');
  }

  const receivedRes = await db.transactions.findAll({
    attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'received']],
    where: {
        type: 'income',
        envelope_id: { [Op.or]: incomeEnvelopeIds }
    },
    raw: true
  });
  if (receivedRes[0].received == null) {
    console.log('[Group Controller] Failed: transaction income could not be found');
    return res.status(404).send('transaction income could not be found');
  }

  let spentRes;
  try {
    spentRes = await db.transactions.findAll({
      attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'spent']], 
      where: {
          type: 'expense',
          envelope_id: { [Op.or]: envelopeIds }
      },
      raw: true
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('could not get transaction spending');
  }
  
  // get group summary data

  // for each defaultGroup...
  let groupEnvelopesRes, groupPlanned;
  try {
    for (let i = 0; i < defaultGroups.length; i++) {

        // get the groups envelopeIds
        groupEnvelopesRes = await db.envelopes.findAll(
          { where: { group_id: defaultGroups[i].id } }
        );
        if (!groupEnvelopesRes) {
          console.log('[Group Controller] Failed: envelope could not be found');
          break;
        }
        groupEnvelopesRes.map(envelope => {
          defaultGroups[i].envelopeIds.push(envelope.id);
        });
  
        // get the group amount_planned sum
        groupPlanned = await db.envelopes.findAll({
          attributes: [[sequelize.fn('SUM', sequelize.col('amount_planned')), 'planned']],
          where: { group_id: defaultGroups[i].id },
          raw: true
        });
        if (groupPlanned.length < 1) {
          console.log('[Group Controller] Failed: envelope planned amounts could not be found');
          break;
        }
        defaultGroups[i].planned = parseInt(groupPlanned[0].planned);

    }
  } catch (err) {
    console.error(err);
    return res.status(500).error(err);
  }

  // for each group (again)
  let groupExpenseSum;
  try {
    for (let i = 0; i < defaultGroups.length; i++) {

      // get the groups total expenditures (after all envelopeIds have been found)
      groupExpenseSum = await db.transactions.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'spent']],
        where: {
          type: 'expense',
          envelope_id: { [Op.or]: defaultGroups[i].envelopeIds }
        },
        raw: true
      });
      if (!groupExpenseSum) {
        console.log('[Group Controller] Failed: transactions could not be found');
        break;
      }
      defaultGroups[i].spent = parseInt(groupExpenseSum[0].spent);
      defaultGroups[i].remaining = defaultGroups[i].planned - defaultGroups[i].spent;

    }
  } catch (err) {
    console.error(err);
    return res.status(500).error(err);
  }

  // format result
  const income = parseInt(incomeRes[0].income); 
  const budgeted = parseInt(budgetedRes[0].budgeted); 
  const received = parseInt(receivedRes[0].received);

  let spent;
  if (!spentRes || spentRes[0].spent == null) {
    spent = 0;
  } else {
    spent = parseInt(spentRes[0].spent);
  }

  const leftToBudget = income - budgeted;
  const remaining = received - spent;

  const groups = [];
  defaultGroups.map(group => {
    groups.push({
      label: group.label,
      planned: group.planned,
      spent: group.spent,
      remaining: group.remaining
    });
  });

  const monthSummary = {
    income: income,
    budgeted: budgeted,
    leftToBudget: leftToBudget,
    received: received,
    spent: spent,
    remaining: remaining,
    groups: groups
  };
  console.log('[Budget Controller] Done');
  return res.status(200).send(monthSummary);

};

/* 
----------------
UPDATE A BUDGET OF THE AUTHENTICATED USER
----------------
*/
exports.updateBudget = async (req, res) => {
  const { budgetId } = req.params;
  const { label } = req.body;

  // validate request
  if (!budgetId || !label) {
    console.log('[Budget Controller] budgetId and label required to update budget');
    return res.status(400).send('budgetId and label required to update budget');
  }

  // check if resource(s) referenced exist
  const budget = await db.budgets.findOne({
    where: {
      id: budgetId
    }
  });
  if (!budget) {
    console.log('[Budget Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  if (!budgetIdsPermitted.includes(budgetId)) {
    console.log('[Budget Controller] Permission to the requested resource denied');
    return res.status(401).send('Permission to the requested resource denied');
  }

  // perform request
  console.log('\n[Budget Controller] Updating budgets...');
  const updateRes = await db.budgets.update(
    { label: label },
    { where: { id: budgetId }}
  );
  if (updateRes != 1) { // not using !== because typeof updateRes is object with int
    console.log('[Budget Controller] Failed: The requested resource could not be updated');
    return res.status(500).send('[Budget Controller] Failed: The requested resource could not be updated');
  }
  console.log('[Budget Controller] Done: Updated the requested resource');
  return res.status(204).send(); // no content

};

/* 
----------------
DELETE A BUDGET OF THE AUTHENTICATED USER
----------------
*/
exports.deleteBudget = async (req, res) => {
  const { budgetId } = req.params;

  // validate request
  if (!budgetId) {
    console.log('[Budget Controller] budgetId required to delete budget');
    return res.status(400).send('budgetId required to delete budget');
  }

  // check if resource(s) referenced exist
  const budget = await db.budgets.findOne({
    where: {
      id: budgetId
    }
  });
  if (!budget) {
    console.log('[Budget Controller] Invalid Request: The requested resource could not be found');
    return res.status(404).send();
  }

  // validate permissions
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[Budget Controller] permBudgetIds: '+permBudgetIds);
  if (!budgetIdsPermitted.includes(budgetId)) {
    console.log('[Budget Controller] Permission to the requested resource denied');
    return res.status(401).send('Permission to the requested resource denied');
  }

  // perform request
  console.log('\n[Budget Controller] Deleting budget...');
  const deleteRes = await db.budgets.destroy({
    where: {
      id: budgetId
    }
  });
  if (deleteRes != 1) { // not using !== because typeof deleteRes is object with int
    console.log('[Budget Controller] Error: The requested resource could not be deleted');
    return res.status(500).send();
  }
  console.log('[Budget Controller] Done: Deleted the requested resource');
  return res.status(204).send(); // No Content

};