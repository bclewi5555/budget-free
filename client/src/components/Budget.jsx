import React, { useState } from 'react';
import BudgetMonth from './BudgetMonth';
import TopAppBar from './TopAppBar';
//import StaticDatePicker from './StaticDatePicker';
//import SimmpleAccordion from "./SimpleAccordion"
//import {createMuiTheme, ThemeProvider} from "@material-ui/core";
//import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles';
//import Random from './Random';

const useStyles = makeStyles ({
  root: {
    height: "100vh",
    background: "#eeeeee"
  },
});

export default function Budget() {
  const [budgetMonth, setBudgetMonth] = useState('1d8b021a-d5ac-4043-8038-5cca73346d61');
  const classes = useStyles();

  return(
    <div className = {classes.root}>
      <TopAppBar/>
      <BudgetMonth budgetMonth={budgetMonth} setBudgetMonth={setBudgetMonth}/>
      {/* <StaticDatePicker/>
      <Random/> */}
    </div>
  );

}