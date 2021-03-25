import React from 'react';
import FundDetail from './FundDetail';

export default function EnvelopeDetail() {
  return(
    <div>
    <DatePicker />
    <FundDetail />
    <Button type={/* Delete Envelope Button */}/>
      {/* Detailed properties and calculations of the envelope */}
    </div>
  );
}