import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import BudgetService from '../../services/BudgetService';

const useStyles = makeStyles((theme) => ({ }));

export default function SelectBudget(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setBudget(event.target.value);
  };

  const [budgetList, setBudgetList] = useState('')

  useEffect(() => {
    
    const fetchData = async () => {
     try {
       const response = await BudgetService.getBudgets("/api/v1/budgets")
      console.log(response)
       //console.log(JSON.stringify(response))
       const budgets = Object.values(response);
       setBudgetList(budgets) 
       
       
     } catch (err) {
       console.error(err)
     }
   };
   fetchData();
   },[])

  //  let budgets = [];
  //  const budgets = Object.values(budgetList);
  // budgets.forEach((budget) => (
  //   budgets.push({
  //     id: budget.id,
  //     label: budget.label
  //   })
  // ));

   

  return (
    <div className={classes.root} >
      <Select 
        value={''}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
      Home
        {/* TODO: Dynamically load a list of MenuItems below from API */}
        {budgetList.map(budget => ( // parentheses instead of braces to return implicitly
          <MenuItem value={budget}>{budget.label}</MenuItem>
        ))}

        {/* <MenuItem value={'b95573be-8f56-4d29-b7a4-fba07c60a859'}>Home</MenuItem>
        <MenuItem value={'080d2177-1f4d-4d1c-b096-d5e5e02fcc23'}>Business</MenuItem> */}
      </Select>
    </div>
  );
}