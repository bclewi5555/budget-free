import React, {useState} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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
  const [label, setLabel] = useState(props.label);
  const [amount, setAmount] = useState(props.amount);

  // const handleDateChange = (date) => { 
  //   setSelectDate(date) 
  // };

  return (

    <TableRow >

      <TableCell>
        <BasicDatePicker
          defaultDate={selectDate}
          setSelectDate={setSelectDate}
        />
      </TableCell>

      <TableCell >
        <TextField
          id="standard-basic"
          defaultValue={label}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setLabel(e.target.value)}
          size='small'
          InputProps={{ disableUnderline: true }}
        />
      </TableCell>

      <TableCell>
        <TextField
          id="standard-basic"
          defaultValue={amount}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setAmount(e.target.value)}
          size='small'
          InputProps={{ disableUnderline: true }}
        />
      </TableCell>

    </TableRow>
  );

}