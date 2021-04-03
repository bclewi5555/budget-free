import React, { useState } from 'react';
import BudgetMonth from './BudgetMonth';
import Nav from './Nav';
import ButtonAppBar from './ButtonAppBar';
import StaticDatePicker from './StaticDatePicker';
import SimmpleAccordion from "./SimpleAccordion"



export default function Budget() {
  const [budgetMonth, setBudgetMonth] = useState('1d8b021a-d5ac-4043-8038-5cca73346d61');

  return(
    <div>
      <ButtonAppBar/>
      <StaticDatePicker/>
     <SimmpleAccordion/>
      <Nav />
      <BudgetMonth budgetMonth={budgetMonth} setBudgetMonth={setBudgetMonth}/>
    
    </div>
  );

}