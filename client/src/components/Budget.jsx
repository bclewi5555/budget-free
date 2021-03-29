import React, { useState } from 'react';
import BudgetMonth from './BudgetMonth';
import LogoutButton from './LogoutButton';
import Nav from './Nav';

export default function Budget() {
  const [month, setMonth] = useState(/*Date.today().month()*/);

  return(
    <div>
      <LogoutButton />
      <Nav />
      <BudgetMonth />
    </div>
  );

}