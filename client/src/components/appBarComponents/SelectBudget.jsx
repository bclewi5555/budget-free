import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItemBudgets from './MenuItemBudgets';

const useStyles = makeStyles((theme) => ({ }));

export default function SelectBudget(props) {
  const classes = useStyles();
  const [mounted, setMounted] = useState(true);

  const handleChange = (event) => {
    props.setBudget(event.target.value);
    setMounted(false);
  };

  return (
    <div className={classes.root} >
      <Select 
        value={mounted && props.budget}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >{props.budget.label}
        {mounted && <MenuItemBudgets setBudget={props.setBudget} />}
      </Select>
    </div>
  );
}