import React, { useState } from 'react';
import BudgetMonthSummary from './BudgetMonthSummary'
//import DetailList from './detailListComponents/DetailList';
import Button from "@material-ui/core/Button"

import EnvelopeGroupList from './envelopeGroupListComponents/EnvelopeGroupList';

export default function BudgetMonth(props) {
  // This needs to get passed down to both Envelope and DetailList
  const [envelopeSelection, setEnvelopeSelection] = useState(null);

  return(
    <div>
      <BudgetMonthSummary/>
     
      <EnvelopeGroupList budgetMonthId={props.budgetMonthId} envelopeSelection={envelopeSelection} setEnvelopeSelection={setEnvelopeSelection} />
      {/*<DetailList envelopeSelection={envelopeSelection} />*/}
     
    </div>
  );
}