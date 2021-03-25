import React from 'react';
import Envelope from './Envelope';

// Dynamically renders all envelopes in the current Group > BudgetMonth > Budget > User.
export default function EnvelopeList() {
  return(
    <div>
      <Envelope />
    </div>
  );
}