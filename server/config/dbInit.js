/*
------------------------
Database Instantiation With Sample Data
------------------------
*/

const sequelize = require('sequelize');

exports.withSampleData = (db) => {

  db.sequelize.sync({ force: true }).then(() => {
    console.log('[Sequelize] Dropped and re-synced the database.');

    // Create Sample Data
    (async () => {
      try {

        // BUDGETS
        const homeBudgetId = 'b95573be-8f56-4d29-b7a4-fba07c60a859';
        const businessBudgetId = '080d2177-1f4d-4d1c-b096-d5e5e02fcc23';
        await db.budgets.create({
          id: homeBudgetId,
          label: 'Home'
        });
        await db.budgets.create({
          id: businessBudgetId,
          label: 'Business'
        });
        console.log('[Sequelize] Sample budgets created.');

        // USERS
        const johnUserId = 'eeee1972-a077-43eb-b83b-ce842e3c833f';
        const janeUserId = '921e8b45-0d73-450d-b65b-e4ac996971c1';
        await db.users.create({
          id: johnUserId,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          username: 'JohnDoe00',
          password_hash: process.env.PASSWORD_HASH_SAMPLE,
          subscription: true,
          default_budget_id: homeBudgetId
        });
        await db.users.create({
          id: janeUserId,
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane.doe@example.com',
          username: 'JaneDoe00',
          password_hash: process.env.PASSWORD_HASH_SAMPLE,
          subscription: true,
          default_budget_id: homeBudgetId
        });
        console.log('[Sequelize] Sample users created.');

        // PERMISSIONS
        await db.permissions.create({
          budget_id: homeBudgetId,
          user_id: johnUserId,
          is_owner: true,
          is_admin: true
        });
        await db.permissions.create({
          budget_id: businessBudgetId,
          user_id: johnUserId,
          is_owner: true,
          is_admin: true
        });
        await db.permissions.create({
          budget_id: homeBudgetId,
          user_id: janeUserId,
          is_owner: false,
          is_admin: true
        });
        await db.permissions.create({
          budget_id: businessBudgetId,
          user_id: janeUserId,
          is_owner: false,
          is_admin: false
        });
        console.log('[Sequelize] Sample permissions created.');

        // BUDGET MONTHS
        const homeMarchBudgetMonthId = 'cd00818a-051f-4643-b1c0-53777aafce30';
        const homeAprilBudgetMonthId = '1d8b021a-d5ac-4043-8038-5cca73346d61';

        const businessMarchBudgetMonthId = '1962ead3-4165-425c-b822-cccd06b98ff6';
        const businessAprilBudgetMonthId = '1510a4dc-7a3f-4c3d-b57e-cb03e2ca3c8d';

        await db.budgetMonths.create({
          id: homeMarchBudgetMonthId,
          budget_id: homeBudgetId,
          year: 2021,
          month: 3
        });
        await db.budgetMonths.create({
          id: homeAprilBudgetMonthId,
          budget_id: homeBudgetId,
          year: 2021,
          month: 4
        });

        await db.budgetMonths.create({
          id: businessMarchBudgetMonthId,
          budget_id: businessBudgetId,
          year: 2021,
          month: 3
        });
        await db.budgetMonths.create({
          id: businessAprilBudgetMonthId,
          budget_id: businessBudgetId,
          year: 2021,
          month: 4
        });
        console.log('[Sequelize] Sample budgetMonths created.');

        // GROUPS
        const homeMarchIncomeGroupId = '3def2699-7cc4-4ffc-bf80-a16fe54059b0';
        const homeMarchFoodGroupId = '4f573ad1-2370-46a2-980b-bca13a49c08b';
        const homeAprilIncomeGroupId = '4c2d628d-6f5e-45d6-b661-b7d4e0e210b4';
        const homeAprilFoodGroupId = '86d86f8d-d4ad-4ffe-9191-3f4aed7cd330';

        const businessAprilIncomeGroupId = 'd2ebc191-13b9-4813-b60b-4a142c20d7b4';
        const businessAprilTaxableExpensesGroupId = 'a317c712-ec00-465c-ab9e-ad8a3f38a376';

        await db.groups.create({
          id: homeMarchIncomeGroupId,
          budget_month_id: homeMarchBudgetMonthId,
          label: 'Income',
          type: 'income'
        });
        await db.groups.create({
          id: homeMarchFoodGroupId,
          budget_month_id: homeMarchBudgetMonthId,
          label: 'Food'
        });
        await db.groups.create({
          id: homeAprilIncomeGroupId,
          budget_month_id: homeAprilBudgetMonthId,
          label: 'Income',
          type: 'income'
        });
        await db.groups.create({
          id: homeAprilFoodGroupId,
          budget_month_id: homeAprilBudgetMonthId,
          label: 'Food'
        });

        await db.groups.create({
          id: businessAprilIncomeGroupId,
          budget_month_id: businessAprilBudgetMonthId,
          label: 'Income',
          type: 'income'
        });
        await db.groups.create({
          id: businessAprilTaxableExpensesGroupId,
          budget_month_id: businessAprilBudgetMonthId,
          label: 'Food'
        });
        console.log('[Sequelize] Sample groups created.');

        // ENVELOPES
        const homeMarchPaychecksEnvelopeId = '4529463c-2e3a-4c38-a34b-72119ddb84c5';
        const homeMarchBonusesEnvelopeId = '8df3bb52-c9ca-4f5d-a93b-bdfc00e852a5';
        const homeMarchGroceriesEnvelopeId = 'bd433367-c72e-4641-bcc9-7315e390eaf6';
        const homeMarchDateNightFoodEnvelopeId = '814e316d-8be7-43c2-b584-bcb3921c6d75';

        const homeAprilPaychecksEnvelopeId = 'cc56b50e-a22a-46c5-959d-d4d77b56dbee';
        const homeAprilBonusesEnvelopeId = '81991ec0-6875-4338-882a-3d34c5bb25dd';
        const homeAprilGroceriesEnvelopeId = 'e2f5d72f-23d9-4533-827b-55d8f65f1b3d';
        const homeAprilDateNightFoodEnvelopeId = '3f8a2522-90a9-4ea3-b3fa-9957e00d95c5';

        const businessAprilSalesEnvelopeId = 'e5ca5df8-9071-4620-9856-4fada6117b66';
        const businessAprilInvestmentsEnvelopeId = '2febb405-f8f8-4585-8124-f2c5586eb83e';
        const businessAprilSalariesEnvelopeId = '5a4fb92f-f8b0-4a63-bcc8-7b27f08ef960';
        const businessAprilServicesEnvelopeId = '3da09302-4a6f-44e1-9818-c6ff7bc7d560';

        await db.envelopes.create({
          id: businessAprilSalesEnvelopeId,
          group_id: businessAprilIncomeGroupId,
          label: 'Sales',
          amount_planned: 200000,
          type: 'default'
        });
        await db.envelopes.create({
          id: businessAprilInvestmentsEnvelopeId,
          group_id: businessAprilIncomeGroupId,
          label: 'Investments',
          amount_planned: 100000,
          type: 'default'
        });
        await db.envelopes.create({
          id: businessAprilSalariesEnvelopeId,
          group_id: businessAprilTaxableExpensesGroupId,
          label: 'Salaries',
          amount_planned: 35000,
          is_starred: false,
          type: 'default'
        });
        await db.envelopes.create({
          id: businessAprilServicesEnvelopeId,
          group_id: businessAprilTaxableExpensesGroupId,
          label: 'Services',
          amount_planned: 12500,
          is_starred: true,
          type: 'default'
        });

        await db.envelopes.create({
          id: homeMarchPaychecksEnvelopeId,
          group_id: homeMarchIncomeGroupId,
          label: 'Paychecks',
          amount_planned: 200000,
          type: 'default'
        });
        await db.envelopes.create({
          id: homeMarchBonusesEnvelopeId,
          group_id: homeMarchIncomeGroupId,
          label: 'Bonuses',
          amount_planned: 100000,
          type: 'default'
        });
        await db.envelopes.create({
          id: homeMarchGroceriesEnvelopeId,
          group_id: homeMarchFoodGroupId,
          label: 'Groceries',
          amount_planned: 35000,
          is_starred: false,
          type: 'default'
        });
        await db.envelopes.create({
          id: homeMarchDateNightFoodEnvelopeId,
          group_id: homeMarchFoodGroupId,
          type: 'sinking',
          label: 'Date Night Food',
          amount_planned: 12500,
          is_starred: true
        });

        await db.envelopes.create({
          id: homeAprilPaychecksEnvelopeId,
          group_id: homeAprilIncomeGroupId,
          label: 'Paychecks',
          amount_planned: 200000,
          type: 'default'
        });
        await db.envelopes.create({
          id: homeAprilBonusesEnvelopeId,
          group_id: homeAprilIncomeGroupId,
          label: 'Bonuses',
          amount_planned: 50000,
          type: 'default'
        });
        await db.envelopes.create({
          id: homeAprilGroceriesEnvelopeId,
          group_id: homeAprilFoodGroupId,
          label: 'Groceries',
          amount_planned: 30000,
          type: 'default',
          is_starred: false,
          notes: 'TODO: Review planned amount in March'
        });
        await db.envelopes.create({
          id: homeAprilDateNightFoodEnvelopeId,
          group_id: homeAprilFoodGroupId,
          type: 'sinking',
          label: 'Date Night Food',
          amount_planned: 10000,
          is_starred: true
        });
        console.log('[Sequelize] Sample envelopes created.');

        // TRANSACTIONS
        const homeAprilKrogerTransactionId = 'e79ed7b2-c14c-4cb0-8045-eaa7669fb1de';

        await db.transactions.create({
          envelope_id: homeAprilPaychecksEnvelopeId,
          type: 'income',
          amount: 100000,
          date: sequelize.literal('CURRENT_TIMESTAMP'),
          label: 'Microsoft Paycheck'
        });
        await db.transactions.create({
          envelope_id: homeAprilPaychecksEnvelopeId,
          type: 'income',
          amount: 100000,
          date: sequelize.literal('CURRENT_TIMESTAMP'),
          label: 'Microsoft Paycheck'
        });
        await db.transactions.create({
          envelope_id: homeAprilBonusesEnvelopeId,
          type: 'income',
          amount: 50000,
          date: sequelize.literal('CURRENT_TIMESTAMP'),
          label: 'Microsoft Bonus'
        });
        await db.transactions.create({
          envelope_id: homeAprilGroceriesEnvelopeId,
          type: 'expense',
          amount: 15000,
          date: sequelize.literal('CURRENT_TIMESTAMP'),
          label: 'Publix'
        });
        await db.transactions.create({
          id: homeAprilKrogerTransactionId,
          envelope_id: homeAprilGroceriesEnvelopeId,
          type: 'expense',
          amount: 3500,
          date: sequelize.literal('CURRENT_TIMESTAMP'),
          label: 'Kroger'
        });
        await db.transactions.create({
          envelope_id: homeAprilDateNightFoodEnvelopeId,
          type: 'expense',
          amount: 4500,
          date: sequelize.literal('CURRENT_TIMESTAMP'),
          label: 'Atlas Pizza Date w/ Jane'
        });
        console.log('[Sequelize] Sample transactions created.');

      } catch (err) {
        console.log(err);
      }
    })();

  });

}
