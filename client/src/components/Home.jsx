import React, { useState } from 'react';
import BudgetService from '../services/BudgetService';
import TopAppBar from './TopAppBar';
import Budget from './Budget';

const res = BudgetService.getBudgets();

export default function Home() {
  const [budgetId, setBudgetId] = useState(res[0]);

  return(
    <div>
      <TopAppBar setBudgetId={setBudgetId} />
      <Budget budgetId={budgetId} />
    </div>
  );

}