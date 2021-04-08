import axios from 'axios';

const BudgetService = {

  async getBudgets() {
    console.log('[BudgetService] [getBudgets] Getting budgets...');
    try {
      const res = await axios.get('/api/v1/budgets');
      console.log('[BudgetService] [getBudgets] Done: ' + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log('[BudgetService] [getBudgets] Error: ' + err);
      return null;
    } 
  }

};

export default BudgetService;
