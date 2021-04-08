import axios from 'axios';

const BudgetMonthService = {

  async getBudgetMonths(budgetId) {
    console.log('[BudgetMonthService] [getBudgetMonths] Getting budgetMonths...');
    try {
      const res = await axios.get('/api/v1/budget-months?budgetId='+budgetId);
      console.log('[BudgetMonthService] [getBudgetMonths] Done: ' + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log('[BudgetMonthService] [getBudgetMonths] Error: ' + err);
      return null;
    } 
  }

};

export default BudgetMonthService;
