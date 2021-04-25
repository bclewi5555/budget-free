import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({ }));

export default function SelectEnvelope(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setEnvelopeView(event.target.value);
  };

  return (
    <div className={classes.root} >
      <Select
        size="small"
        value={props.envelopeView}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
      Home
        {/* TODO: Dynamically load a list of MenuItems below from API */}
        <MenuItem size="small" value={'remaining'}>Remaining</MenuItem>
        <MenuItem value={'spent'}>Spent</MenuItem>
      </Select>
    </div>
  );
}