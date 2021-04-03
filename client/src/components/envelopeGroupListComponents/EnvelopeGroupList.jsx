import React from 'react';
import EnvelopeList from './EnvelopeList';
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles';
import EnvelopeGroup from './EnvelopeGroup';


// Dynamically renders all groups in the current BudgetMonth > Budget > User.
const useStyles = makeStyles((theme) => ({
  root: {
  width: "45%",
  height: "45vw",
  //  padding: '30px',
   
 }, 
 title: {
     fontSize: 25,
     
 },



 
}));




export default function EnvelopeGroupList(props) {
  const classes = useStyles();
  return(
    <div>
      
      {/* <h2>[EnvelopeGroupList]</h2> */}
      <EnvelopeGroup budgetMonth={props.budgetMonth} envelopeSelection={props.envelopeSelection} setEnvelopeSelection={props.setEnvelopeSelection} />
      
    </div>
  );
}