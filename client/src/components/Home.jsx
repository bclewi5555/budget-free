import React, { useState, useEffect,} from 'react';
import BudgetService from '../services/BudgetService';
import TopAppBar from './TopAppBar';
import Budget from './Budget';
import { Button } from '@material-ui/core';


const res = BudgetService.getBudgets();
console.log('[Home] BudgetService.getBudgets(): '+res);

const Home = (props)  => {
  const [budget, setBudget] = useState({
    "id": "b95573be-8f56-4d29-b7a4-fba07c60a859",
    "label": "Home",
    "createdAt": "2021-04-19T17:40:49.847Z",
    "updatedAt": "2021-04-19T17:40:49.847Z"
  })
  // useEffect(() => {
  //    const fetchData = async () => {
  //     try {
  //       const response = await BudgetService.getBudgets("/api/v1/budgets")
  //       console.log(response)
  //       console.log(typeof response)
  //       setBudget(response.budget)
        
  //     } catch (err) {}
  //   };
  //   fetchData();
  //   },[])

  
  return(
    <div>
      <TopAppBar budget={budget} setBudget={setBudget}  />
      
      <Budget budget={budget} />
      
      

      
            
             
      
    </div>
  );

}
export default Home;