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
READ ENVELOPES FOR BUDGET MONTH
----------------
*/
exports.getEnvelopes = async (req, res) => {

  console.log('\n[Envelope Controller] Getting envelopes...');

  // Find all groups for current BudgetMonth
  console.log('[Envelope Controller] req.query.budgetMonthId: ' + JSON.stringify(req.query.budgetMonthId));
  await db.groups.findAll({
    where: { budget_month_id: req.query.budgetMonthId }
  })
    .then(async (data) => {
      //console.log('[Envelope Controller] db.groups data: ' + JSON.stringify(data));

      const groupIds = [];
      data.forEach((group, index) => {
        groupIds.push(group.id);
      });
      console.log('[Envelope Controller] groupIds: ' + groupIds);

      // Find all envelopes of all groups for currrent BudgetMonth
      await db.envelopes.findAll({
        where: {
          group_id: { [Op.or]: groupIds }
        }
      })
        .then((data) => {
          console.log('[Envelope Controller] db.envelopes data: ' + JSON.stringify(data));
          return res.send(data);
        })
        .catch(err => {
          console.log('[Envelope Controller] Error: ' + err);
          return res.status(500).send({ message: err.message });
        });

    })
    .catch(err => {
      console.log('[Envelope Controller] Error: ' + err);
      return res.status(500).send({ message: err.message });
    });

};
