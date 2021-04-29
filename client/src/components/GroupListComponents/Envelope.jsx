import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FullScreenDialog from '../detailListComponents/FullScreenDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
}));

export default function Envelope(props) {
  const classes = useStyles();
  const [planned, setPlanned] = useState(props.planned);
  const [spent] = useState(props.spent);

  return (
    <TableRow className={classes.root}>

      <TableCell >
        <TextField 
        id="standard-basic" 
        defaultValue={props.label} 
        InputLabelProps={{ shrink: true }} 
        size='small'
        InputProps={{ disableUnderline: true }}
        />
      </TableCell>

      <TableCell>
        <TextField 
        id="standard-basic" 
        defaultValue={props.planned} 
        InputLabelProps={{ shrink: true }} 
        onChange={(e) => setPlanned(e.target.value)} 
        size='small'
        InputProps={{ disableUnderline: true }}
        />
      </TableCell>

      <TableCell>
      {props.incomeType ? // if income...

        <Typography size='small'> {props.received} </Typography>

        :

        // else, if food...
        props.envelopeView === "spent" ?
        (
            <Typography size='small'>{spent}</Typography>
        ) :

        (
            <Typography size='small'> {planned - spent} </Typography>
        )

      }
      </TableCell>

      <FullScreenDialog 
        label={props.label}
        envelopeSelection={props.envelopeSelection}
      />

    </TableRow>
  );
}
