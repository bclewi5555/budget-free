import React from 'react';
import EnvelopeDetail from './EnvelopeDetail';
//import SummaryDetail from './SummaryDetail';
import TransactionList from './TransactionList';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

// Dynamically renders all details in the current Envelope > Group > BudgetMonth > Budget > User.

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function DetailDialog(props) {
  const classes = useStyles();
 



  const handleClose = () => {
    props.setOpen(false);
  };

  
    return(
      
      <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
         <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton 
            edge="start" 
            color="inherit" 
            onClick={handleClose} 
            aria-label="close">
              <CloseIcon />
            </IconButton>
            
            <Typography variant="h6" className={classes.title}>
              Food: Groceries
            </Typography>
            
          </Toolbar>
        </AppBar>
        <EnvelopeDetail envelopeSelection={props.envelopeSelection} />
        <TransactionList envelopeSelection={props.envelopeSelection} />
       
        </Dialog>
    );
  }
  
