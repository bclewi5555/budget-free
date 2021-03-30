import React from 'react';

export default function Envelope(props) {
  return(
    <div>
      <li>[Envelope] {props.label} {props.amountPlanned}</li>
      {/* Properties and calculations of the envelope */}
    </div>
  );
}