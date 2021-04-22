import React, { useState } from 'react';
//import DetailList from './detailListComponents/DetailList';

import EnvelopeGroupList from './envelopeGroupListComponents/EnvelopeGroupList';

export default function BudgetMonth(props) {
  // This needs to get passed down to both Envelope and DetailList
  const [envelopeSelection, setEnvelopeSelection] = useState(null);

  return(
    <div>
     
      <EnvelopeGroupList budgetMonthId={props.budgetMonthId} envelopeSelection={envelopeSelection} setEnvelopeSelection={setEnvelopeSelection} />
      {/*<DetailList envelopeSelection={envelopeSelection} />*/}
    </div>
  );
}