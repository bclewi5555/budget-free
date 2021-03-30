import React, { useState } from 'react';
import BudgetMonth from './BudgetMonth';
import LogoutButton from './LogoutButton';
import Nav from './Nav';

export default function Budget() {
  const [budgetMonth, setBudgetMonth] = useState('1d8b021a-d5ac-4043-8038-5cca73346d61');

  return(
    <div>
      <LogoutButton />
      <Nav />
      <BudgetMonth budgetMonth={budgetMonth} setBudgetMonth={setBudgetMonth}/>
    </div>
  );

}