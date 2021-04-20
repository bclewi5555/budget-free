import React, { useEffect, useState } from 'react';
//import BudgetService from '../../services/BudgetService';
//import useAsync from '../../util/useAsync';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({ }));

export default function MenuItemBudgets(props) {
  const classes = useStyles();
  const [budgetList, setBudgetList] = useState([
    /*{id: 1, label: 'One'},
    {id: 2, label: 'Two'} */
  ]);
  //useAsync(BudgetService.getBudgets(), setBudgetList()); // custom React Hook

  const getData = async () => { // async func defined outside of useEffect (sync)
    const { data } = await axios.get('/api/vi/budgets');
    setBudgetList(data);
  };

  useEffect(() => {
    getData();
  }, []); // react-hook dependencies

  return (
    <div className={classes.root} >
      { console.log('[SelectBudget] Render of budgetList (below)') }
      { console.log(budgetList) }

      {/* TODO: Dynamically load a list of MenuItems below from API */}
      {
        budgetList.map(budget => ( // parentheses instead of braces to return implicitly
          <MenuItem key={budget.id} value={budget}>{budget.label}</MenuItem>
        ))
      }
      {/* <MenuItem value={'b95573be-8f56-4d29-b7a4-fba07c60a859'}>Home</MenuItem>
      <MenuItem value={'080d2177-1f4d-4d1c-b096-d5e5e02fcc23'}>Business</MenuItem> */}
    </div>
  );
}