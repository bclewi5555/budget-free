import React, { Fragment, useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function BasicDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker utils={DateFnsUtils}
       
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
      />
      </MuiPickersUtilsProvider>

      
    
  );
}

export default BasicDatePicker;