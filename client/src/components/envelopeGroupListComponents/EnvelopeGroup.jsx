import React /*, {useState}8*/ from 'react'; 
import EnvelopeList from './EnvelopeList';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function EnvelopeGroup(props) {
  //const [expanded, setExpanded] = useState(true);
   
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      > 
        <Typography>{props.label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <EnvelopeList groupID={props.groupID}></EnvelopeList>
      </AccordionDetails>
    </Accordion>   
  );

}

