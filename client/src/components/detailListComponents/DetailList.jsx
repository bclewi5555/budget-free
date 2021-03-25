import React from 'react';
import EnvelopeDetail from './EnvelopeDetail';
import SummaryDetail from './SummaryDetail';
import TransactionList from './TransactionList';

// Dynamically renders all details in the current Envelope > Group > BudgetMonth > Budget > User.
export default function DetailList(props) {
  
  if (props.envelopeSelection === null) {
    return(
      <div>
        <SummaryDetail />
      </div>
    );
  } else if (props.envelopeSelection !== null) {
    return(
      <div>
        <EnvelopeDetail envelopeSelection={props.envelopeSelection} />
        <TransactionList envelopeSelection={props.envelopeSelection} />
        <Button type={/*'addTransaction'*/}/>
      </div>
    );
  }
  
}