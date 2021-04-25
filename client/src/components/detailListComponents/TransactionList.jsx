import React, {useState} from 'react';
import Transaction from './Transaction';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    size: 'small'
  },
  
  buttonSize: {
    size: 'large',
    display: 'flex',
    color: 'primary'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    size: 'small'
  },
}));


// Dynamically renders all transactions in the current Envelope > Group > BudgetMonth > Budget > User.
export default function TransactionList(props) {
  const classes = useStyles();
  
  //const [envelopes, setEnvelopes] = useState(envelopeData);

  let envelopes = [];
  if (props.groupID === '4c2d628d-6f5e-45d6-b661-b7d4e0e210b4') { // Income
    envelopes = [
      {
          "id": "cc56b50e-a22a-46c5-959d-d4d77b56dbee",
          "group_id": "4c2d628d-6f5e-45d6-b661-b7d4e0e210b4",
          "type": "income",
          "label": "Paychecks",
          "amount_planned": 2000,
          "is_starred": false,
          "due_date": null,
          "starting_balance": null,
          "savings_goal": null,
          "notes": null,
          "createdAt": "2021-04-23T03:46:33.650Z",
          "updatedAt": "2021-04-23T03:46:33.650Z",
          "received": 2000,
          transactions: [
            {
                "id": "d0ae2142-761e-4f99-b54b-6d5e4ac62f85",
                "envelope_id": "cc56b50e-a22a-46c5-959d-d4d77b56dbee",
                "type": "income",
                "amount": 1000,
                "date": "2021-04-23",
                "label": "Microsoft Paycheck",
                "reference_number": null,
                "notes": null,
                "createdAt": "2021-04-23T03:46:33.657Z",
                "updatedAt": "2021-04-23T03:46:33.657Z"
            },
            {
                "id": "8295d359-3b08-4821-8b6c-f338f7a03a6a",
                "envelope_id": "cc56b50e-a22a-46c5-959d-d4d77b56dbee",
                "type": "income",
                "amount": 1000,
                "date": "2021-04-23",
                "label": "Microsoft Paycheck",
                "reference_number": null,
                "notes": null,
                "createdAt": "2021-04-23T03:46:33.661Z",
                "updatedAt": "2021-04-23T03:46:33.661Z"
            }
        ]
      },
      {
          "id": "81991ec0-6875-4338-882a-3d34c5bb25dd",
          "group_id": "4c2d628d-6f5e-45d6-b661-b7d4e0e210b4",
          "type": "income",
          "label": "Bonuses",
          "amount_planned": 500,
          "is_starred": false,
          "due_date": null,
          "starting_balance": null,
          "savings_goal": null,
          "notes": null,
          "createdAt": "2021-04-23T03:46:33.652Z",
          "updatedAt": "2021-04-23T03:46:33.652Z"
      }
  ]
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
  
  // let envelopes = [];
  // EnvelopeService.getEnvelopes(props.budgetMonth)
  //   .then((res) => {
  //     res.forEach((envelope) => {
  //       envelopes.push({
  //         label: envelope.label,
  //         amountPlanned: envelope.amount_planned
  //       });
  //     });
  //   })
  //   .catch(err => {console.log(err)});
  // console.log(envelopes);
  

  return (
    
      <Table>
        <TableHead > 
          <TableRow >
            <TableCell  > Date </TableCell>
          <TableCell > Label </TableCell>
            <TableCell  > Amount </TableCell>
          </TableRow >
        </TableHead>
        <TableBody>
          
          <Transaction
          defaultDate={"2021-04-01T12:00:00"}
          label="Groceries"
          amount={50}
        
          />
        </TableBody>
        
        <Fab color="primary" size="medium" aria-label="add" className={classes.fab} >
        <AddIcon />
        </Fab>
       
      </Table>


    
  );
}
