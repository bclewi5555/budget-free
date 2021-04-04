import React, { useState } from 'react';
//import DetailList from './detailListComponents/DetailList';
import BudgetMonthNav from './BudgetMonthNav';
import EnvelopeGroupList from './envelopeGroupListComponents/EnvelopeGroupList';

export default function BudgetMonth(props) {
  // This needs to get passed down to both Envelope and DetailList
  const [envelopeSelection, setEnvelopeSelection] = useState(null);

  return(
    <div>
      <BudgetMonthNav />
      <EnvelopeGroupList budgetMonth={props.budgetMonth} envelopeSelection={envelopeSelection} setEnvelopeSelection={setEnvelopeSelection} />
      {/*<DetailList envelopeSelection={envelopeSelection} />*/}
    </div>
  );
}