import React /*, {useState}*/ from 'react'; 
import EnvelopeList from './EnvelopeList';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Envelope from '../envelopeGroupListComponents/Envelope';
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    padding: '30px',
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
    fontSize: 20,
    textAlign: 'left'
    
  },
  borderColor: {
    border:1,
    borderColor:"red"
  }
}));

export default function EnvelopeGroup(props) {
  const classes = useStyles();
   
  return (
   
    <Accordion  className={`${classes.root} ${classes.envelopeGroup} ${classes.borderColor}`}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      > 
        <Typography className={classes.title}>{props.label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <EnvelopeList groupId={props.groupId} className={classes.title}></EnvelopeList>
        <Envelope className></Envelope>
      </AccordionDetails>
     
    </Accordion>  
    
    
    
  );

}

