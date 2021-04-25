import React, { useState } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

/*
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 10,
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));
*/



export default function Envelope(props) {
  //const classes = useStyles();
  const [planned, setPlanned] = useState(props.planned);
  const [spent] = useState(props.spent);



  return (



    <TableRow >
      <TableCell >
        <TextField id="standard-basic" defaultValue={props.label} InputLabelProps={{ shrink: true }} />
      </TableCell>

      <TableCell>
        <TextField id="standard-basic" defaultValue={props.planned} InputLabelProps={{ shrink: true }} onChange={(e) => setPlanned(e.target.value)} />
      </TableCell>
      {props.envelopeView === "spent" ? 
      (
        <TableCell>
        <Typography>{spent}</Typography>
      </TableCell>
      ) : 
      
      
      
      
      
    (
        <TableCell>
        <Typography> {planned - spent} </Typography>
      </TableCell>
      )  
      }
      

      
    </TableRow>

  );
}
