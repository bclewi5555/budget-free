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
  const [planned, setPlanned] = useState(0);
  const [spent] = useState(50);

  

  return (



    <TableRow >
      <TableCell>
        <Typography gutterBottom variant="subtitle1">
          {props.label}
        </Typography>
      </TableCell>
      <TableCell>
        <TextField d id="standard-basic" InputLabelProps={{ shrink: true }} onChange={(e) => setPlanned(e.target.value)} />

        
      </TableCell>
      <TableCell>
        <TextField id="standard-basic" InputLabelProps={{ shrink: true }} onChange={(e) => setPlanned(e.target.value)} />
      </TableCell>
      <TableCell>
        <Typography>{spent}</Typography>
      </TableCell>
      <TableCell>
        <Typography> {planned - spent} </Typography>
      </TableCell>
    </TableRow>

  );
}
