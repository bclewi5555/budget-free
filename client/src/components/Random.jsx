import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./envelopeGroupListComponents/Envelope";
import Envelope from './envelopeGroupListComponents/Envelope';




const useStyles = makeStyles((theme) => ({
    root: {
      //width: '25%',
    //   padding: '30px',
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightRegular,
    },
    divPadding: {
        padding: '30px',
    },
    envelopeGroup: {
        marginTop: '30px',
        marginBottom:'30px',
        
        
    }
  }));

export default function Random() {
    const classes = useStyles();
  
    return (
      <div className = {classes.divPadding}>
          <Accordion className={`${classes.root} ${classes.envelopeGroup}`}>
              <AccordionSummary 

                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
            <Typography className={classes.heading}>Paychecks</Typography>
            </AccordionSummary>
            <AccordionDetails>
             <Envelope></Envelope>
            </AccordionDetails>
          </Accordion>

          <Accordion className={`${classes.root} ${classes.envelopeGroup}`}>
              <AccordionSummary 

                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
            <Typography className={classes.heading}>Groceries</Typography>
            </AccordionSummary>
            <AccordionDetails>
             <Envelope></Envelope>
            </AccordionDetails>
          </Accordion>

          <Accordion  className={`${classes.root} ${classes.envelopeGroup}`}>
              <AccordionSummary 

                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
            <Typography className={classes.heading}>Giving</Typography>
            </AccordionSummary>
            <AccordionDetails>
             <Envelope></Envelope>
            </AccordionDetails>
          </Accordion>
       
       
      </div>
    );
  }