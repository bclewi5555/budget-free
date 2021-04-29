import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  select: {
    color: '#FFF'
  }
}));

export default function SelectBudget(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setBudgetId(event.target.value);
  };

  return (
    <div className={classes.root} >
      <Select
        className={classes.select}
        value={props.budgetId}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
      Home
        {/* TODO: Dynamically load a list of MenuItems below from API */}
        <MenuItem value={'b95573be-8f56-4d29-b7a4-fba07c60a859'}>Home</MenuItem>
        <MenuItem value={'080d2177-1f4d-4d1c-b096-d5e5e02fcc23'}>Business</MenuItem>
      </Select>
    </div>
  );
}