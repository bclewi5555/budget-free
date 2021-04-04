import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function BudgetMonthNav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        <Grid container direction="column">
          <Grid item xs={12} sm={6}>
            <ArrowBackIosIcon />Selected Month<ArrowForwardIosIcon />
          </Grid>
        </Grid>
      </Card>
    </div>
  );

}