import React, { useState } from 'react';
import BudgetMonth from './BudgetMonth';
//import StaticDatePicker from './testComponents/StaticDatePicker';
//import SimmpleAccordion from "./SimpleAccordion"
//import {createMuiTheme, ThemeProvider} from "@material-ui/core";
//import Card from '@material-ui/core/Card'
//import { makeStyles } from '@material-ui/core/styles';
import Transaction from './detailListComponents/Transaction'




/*
const useStyles = makeStyles ({
  root: {
    height: "100vh",
    background: "#eeeeee"
  },
});
*/

export default function Budget(props) {
  const [budgetMonthId, setBudgetMonthId] = useState('1d8b021a-d5ac-4043-8038-5cca73346d61');
  //const classes = useStyles();

  return(
    <div >
       
      <BudgetMonth budgetMonthId={budgetMonthId} setBudgetMonthId={setBudgetMonthId}/>
    
      
     
      
    
     
    </div>
  );

}