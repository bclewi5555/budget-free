import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import BasicDatePicker from '../BasicDatePicker';




/*
function preventDefault(event) {
  event.preventDefault();
}
*/

// Dynamically renders all transactions in the current Envelope > Group > BudgetMonth > Budget > User.
export default function Transaction(props) {
  const [selectDate, setSelectDate] = useState(new Date(props.defaultDate));
  const handleDateChange = (date) => {setSelectDate(date)};
  const [amount, setAmount] = useState(props.amount);


  return (
  
  <TableRow >

    <TableCell>
    <BasicDatePicker/>
    


    </TableCell>

 
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
      defaultValue={props.amount} 
      InputLabelProps={{ shrink: true }} 
      onChange={(e) => setAmount(e.target.value)} 
      size='small'
      InputProps={{ disableUnderline: true }}
      
      />

    </TableCell>
   
  </TableRow>
 
  

);
}