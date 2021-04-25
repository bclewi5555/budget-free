import React, { useState } from 'react';
import BudgetMonthSummary from './BudgetMonthSummary'
//import DetailList from './detailListComponents/DetailList';
//import Button from "@material-ui/core/Button"

import GroupList from './GroupListComponents/GroupList';

export default function BudgetMonth(props) {
  // This needs to get passed down to both Envelope and DetailList
  const [envelopeSelection, setEnvelopeSelection] = useState(null);

  return(
    <div>
      <BudgetMonthSummary/>
     
      <GroupList budgetMonthId={props.budgetMonthId} envelopeSelection={envelopeSelection} setEnvelopeSelection={setEnvelopeSelection} />
      {/*<DetailList envelopeSelection={envelopeSelection} />*/}
     
    </div>
  );
}