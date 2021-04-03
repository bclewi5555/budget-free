import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StaticDatePicker from "./StaticDatePicker"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '25%',
    padding: '30px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     <p> Looks weird because date picker is in a card...to make the above part look good</p>
      <Accordion>
        <AccordionSummary
        
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Budget Month</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <StaticDatePicker></StaticDatePicker>
            

            

          
        </AccordionDetails>
      </Accordion>
      
     
    </div>
  );
}