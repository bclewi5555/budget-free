import React from 'react';
import EnvelopeList from './EnvelopeList';

// Dynamically renders all groups in the current BudgetMonth > Budget > User.
export default function EnvelopeGroupList(props) {
  return(
    <div>
      <h2>[EnvelopeGroupList]</h2>
      <EnvelopeList budgetMonth={props.budgetMonth} envelopeSelection={props.envelopeSelection} setEnvelopeSelection={props.setEnvelopeSelection} />
    </div>
  );
}