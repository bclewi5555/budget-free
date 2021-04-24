import React from 'react';
//import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

/*
function preventDefault(event) {
  event.preventDefault();
}
*/

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

// Dynamically renders all transactions in the current Envelope > Group > BudgetMonth > Budget > User.
export default function Transaction(props) {
  const classes = useStyles();
  return (
   <Card>
   <React.Fragment>
      <h3>Food</h3>
      <h2>Groceries</h2>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
       <Button color='primary' > Add New</Button>
      </div>
    </React.Fragment>
    </Card>
  );
}