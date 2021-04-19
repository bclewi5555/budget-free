import axios from 'axios';

const BudgetService = {

  async getBudgets() {
    console.log('[BudgetService] [getBudgets] Getting budgets...');
    try {
      const res = await axios.get('/api/v1/budgets');
      console.log('[BudgetService] [getBudgets] Done: ' + JSON.stringify(res.data));
      
      if ( res.status !== 200) {
      return [];
      } 
      console.log('Status is ' +res.status)
      
      return res.data;
      
    } catch (err) {
      console.log('[BudgetService] [getBudgets] Error: ' + err);
      return [];
    }
  }

};

export default BudgetService;
