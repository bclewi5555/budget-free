import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DetailDialog from '../detailListComponents/DetailDialog';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    
    width: '100%'
  },

}));




export default function Envelope(props) {
  const classes = useStyles();
  const [planned, setPlanned] = useState(props.planned);
  const [spent] = useState(props.spent);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  

 



  return (
    
    <TableRow className={classes.root} onClick={handleClickOpen}>

   
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
      {props.envelopeView === "spent" ?
        (
          <TableCell>
            <Typography size='small'>{spent}</Typography>
          </TableCell>
        ) :

        (
          <TableCell>
            <Typography size='small'> {planned - spent} </Typography>
          </TableCell>
        )
      }
     <DetailDialog setOpen={setOpen} open={open}/>
    </TableRow>
  

  );
}
