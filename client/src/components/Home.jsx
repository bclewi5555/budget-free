import React, { useState } from 'react';
import BudgetService from '../services/BudgetService';
import TopAppBar from './TopAppBar';
import Budget from './Budget';

const res = BudgetService.getBudgets();
console.log('[Home] BudgetService.getBudgets(): '+res);

export default function Home() {
  const [budgetId, setBudgetId] = useState('b95573be-8f56-4d29-b7a4-fba07c60a859');

  return(
    <div>
      <TopAppBar budgetId={budgetId} setBudgetId={setBudgetId} />
      <Budget budgetId={budgetId} />
    </div>
  );

}