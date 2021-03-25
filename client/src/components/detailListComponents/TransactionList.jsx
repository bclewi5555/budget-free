import React from 'react';
import Transaction from './Transaction';

// Dynamically renders all transactions in the current Envelope > Group > BudgetMonth > Budget > User.
export default function TransactionList(props) {
  return (
    <div>
      <Transaction />
    </div>
  );
  
}