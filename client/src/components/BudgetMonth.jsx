import React, { useState } from 'react';
import DetailList from './DetailList';
import EnvelopeGroupList from './EnvelopeGroupList';

export default function BudgetMonth() {
  // This needs to get passed down to both Envelope and DetailList
  const [envelopeSelection, setEnvelopeSelection] = useState(null);

  return(
    <div>
      <EnvelopeGroupList />
      <DetailList />
    </div>
  );
}