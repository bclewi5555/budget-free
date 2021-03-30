import React from 'react';
import Envelope from './Envelope';
import EnvelopeService from '../../services/EnvelopeService';

// Dynamically renders all envelopes in the current Group > BudgetMonth > Budget > User.
export default function EnvelopeList(props) {
  //const [envelopes, setEnvelopes] = useState(envelopeData);

  /*
  const envelopes = [
    {
      label: 'Paychecks',
      amount_planned: 2000
    },
    {
      label: 'Groceries',
      amount_planned: 300
    },
    {
      label: 'Date Night Food',
      amount_planned: 75
    }
  ];
  */
  
  
  let envelopes = [];
  EnvelopeService.getEnvelopes(props.budgetMonth)
    .then((res) => {
      res.forEach((envelope) => {
        envelopes.push({
          label: envelope.label,
          amountPlanned: envelope.amount_planned
        });
      });
    });
  console.log(envelopes);
  

  return(
    <div>
      <h3>[EnvelopeList]</h3>
      <ul>
        {/*envelopes.map((envelope) => <Envelope label={envelope.label} amountPlanned={envelope.amount_planned}/>)*/}
        {
          envelopes.map((envelope) => {
            <Envelope
            //id={envelope.id}
            //groupId={envelope.group_id}
            //type={envelope.type}
            label={envelope.label}
            amountPlanned={envelope.amount_planned}
            //isStarred={envelope.is_starred}
            //dueDate={envelope.due_date}
            //startingBalance={envelope.starting_balance}
            //savingsGoal={envelope.savings_goal}
            //notes={envelope.notes}
          />
          })
        }
      </ul>
    </div>
  );
}