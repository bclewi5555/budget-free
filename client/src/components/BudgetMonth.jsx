import React, { useState } from 'react';
//import DetailList from './detailListComponents/DetailList';
import EnvelopeGroupList from './envelopeGroupListComponents/EnvelopeGroupList';

export default function BudgetMonth(props) {
  // This needs to get passed down to both Envelope and DetailList
  const [envelopeSelection, setEnvelopeSelection] = useState(null);

  return(
    <div>
      <h2>[BudgetMonth] budgetMonth: {props.budgetMonth}</h2>
      <EnvelopeGroupList budgetMonth={props.budgetMonth} envelopeSelection={envelopeSelection} setEnvelopeSelection={setEnvelopeSelection} />
      {/*<DetailList envelopeSelection={envelopeSelection} />*/}
    </div>
  );
}