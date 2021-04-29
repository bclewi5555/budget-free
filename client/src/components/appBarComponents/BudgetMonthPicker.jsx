import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    color: '#FFF'
  }
}));

function BudgetMonthPicker(props) {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <DatePicker utils={DateFnsUtils}
        className={classes.datePicker}
        views={["year", "month"]}
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
        InputProps={{ disableUnderline: true }}
      />
    </MuiPickersUtilsProvider>
  );

}

export default BudgetMonthPicker;