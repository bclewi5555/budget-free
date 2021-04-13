import React  from 'react';
import SelectBudget from './appBarComponents/SelectBudget';
import LogoutButton from './appBarComponents/LogoutButton';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            BudgetFree
          </Typography>
          <SelectBudget budgetId={props.budgetId} setBudgetId={props.setBudgetId} />
          <LogoutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}