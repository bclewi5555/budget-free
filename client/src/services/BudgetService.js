import axios from 'axios';

const BudgetService = {

  async getBudgets() {
    try {
      console.log('[BudgetService] Getting budgets...');
      const res = await axios.get('/api/v1/budgets');
      if (res.status !== 200) {
        console.log('[BudgetService] Failed: Status '+res.status);
        return [];
      }
      //console.log('[BudgetService] typeof res.data (below): '+typeof res.data);
      //console.log(res.data);

      const budgets = Object.values(res.data);
      /*
      console.log('[BudgetService] typeof Object.values(res.data) (below): '+typeof budgets);
      console.log(budgets);
      budgets.forEach(budget => {
        console.log('[BudgetService] typeof budgets[budget] (below): '+typeof budget);
        console.log(budget);
      });
      */

      console.log('[BudgetService] Done');
      return budgets;
    } catch (err) {
      console.error('[BudgetService] Error: ' + err);
      return [];
    }
  }

};

export default BudgetService;
