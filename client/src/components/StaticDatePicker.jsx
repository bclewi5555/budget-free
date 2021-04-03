import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'


const useStyles = makeStyles((theme) => ({
    root: {
   // width: "26.8%",
    //padding: '30px',
     
   }, 
   title: {
       fontSize: 25,
       
   },



   
  }));


export default function StaticDatePicker() {
    const classes = useStyles();
  
  const [selectDate, setSelectDate] = React.useState (
    new Date ("2021-04-01T12:00:00")
  )

  const handleDateChange = (date) => {
    setSelectDate(date)
  }
  return (
      <div className ={classes.root}>
            <Card>
             <Typography className = {classes.title}>Budget Month </Typography>
                <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                     <Grid >
          
                         <KeyboardDatePicker className
                             disableToolBar
                             variant='dialog' // inline might be better
                             format='MM/dd/yyyy'
                             margin='normal'
                             id='date-picker'
                             value={selectDate}
                             onChange={handleDateChange}
                             KeyBoardButtonProps ={{
                            'aria-label': 'change date'
                             }}
                        />
                     </Grid>
                </MuiPickersUtilsProvider>
                </Card>
            
         </div>
  );
}

