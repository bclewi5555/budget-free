import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({ }));

export default function SelectEnvelope(props) {
  const classes = useStyles();

  const [envelopeView, setEnvelopeView] = useState("remaining");

  const handleChange = (event) => {
    // props.setEnvelopeView(event.target.value);
    setEnvelopeView(event.target.value);
  };

  return (
    <div className={classes.root} >
      <Select
        
        // value={props.envelopeView}
        value={envelopeView}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
      Home
        {/* TODO: Dynamically load a list of MenuItems below from API */}
        <MenuItem value={'remaining'}>Remaining</MenuItem>
        <MenuItem value={'spent'}>Spent</MenuItem>
      </Select>
    </div>
  );
}