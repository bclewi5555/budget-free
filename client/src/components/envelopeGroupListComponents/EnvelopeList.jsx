import React from 'react';
import Envelope from './Envelope';
import Button from '@material-ui/core/Button'
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

//import EnvelopeService from '../../services/EnvelopeService';

// Dynamically renders all envelopes in the current Group > BudgetMonth > Budget > User.
export default function EnvelopeList(props) {
  //const [envelopes, setEnvelopes] = useState(envelopeData);

  let envelopes = [];
  if (props.groupID === '4c2d628d-6f5e-45d6-b661-b7d4e0e210b4') { // Income
    envelopes = [
      {
        label: 'Paychecks',
        amountPlanned: 1500
      },
      {
        label: 'Tax Refunds',
        amountPlanned: 500
      }
    ];
  } else if (props.groupID === '86d86f8d-d4ad-4ffe-9191-3f4aed7cd330') { //Food
    envelopes = [
      {
        label: 'Groceries',
        amountPlanned: 300
      },
      {
        label: 'Restaurants',
        amountPlanned: 80
      }
    ];
  }
  /*
  let envelopes = [];
  EnvelopeService.getEnvelopes(props.budgetMonth)
    .then((res) => {
      res.forEach((envelope) => {
        envelopes.push({
          label: envelope.label,
          amountPlanned: envelope.amount_planned
        });
      });
    })
    .catch(err => {console.log(err)});
  console.log(envelopes);
  */

  return (
    <div>

      <Table size="medium" >


        <TableHead>




          <TableRow>
            <TableCell> Planned </TableCell>
            <TableCell> Spent </TableCell>
            <TableCell> Remaining </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>


          {envelopes.map((envelope) => {
            return (<Envelope
              key={envelope.label}
              label={envelope.label}
              amountPlanned={envelope.amount_planned}
            />)
          })}
          {/*
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
          */}
        </TableBody>

        <Button color="primary" >Add Item </Button>
      </Table>


    </div>
  );
}
