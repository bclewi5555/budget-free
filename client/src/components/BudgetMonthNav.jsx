import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
   
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  divPadding: {
      padding: '30px',
  },
  envelopeGroup: {
      marginTop: '15px',
      marginBottom:'15px',
      
   },
   title: {
     fontSize:20,
     fontWeight: 'fontWeightBold',
     
   }
 
  
}));

export default function BudgetMonthNav() {
  const classes = useStyles();

  const [selectDate, setSelectDate] = useState(new Date("2021-04-01T12:00:00"));
  const handleDateChange = (date) => {setSelectDate(date)};

  return (
    <div className>
      
        <Typography className={classes.title} fontWeight="fontWeightBold" textAlign ="center"> </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid >
            <KeyboardDatePicker className
              disableToolBar
              variant='dialog' // inline might be better
              views={["year", "month"]}
              format='MM//yyyy'
              margin='normal'
              id='date-picker'
              value={selectDate}
              onChange={handleDateChange}
              KeyBoardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      
    </div>
  );

}