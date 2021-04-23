import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Envelope from './Envelope';
import Button from '@material-ui/core/Button'
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '25%',
   padding: '30px',
   
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  divPadding: {
      padding: '30px',
  },
  envelopeGroup: {
      marginTop: '30px',
      marginBottom:'30px',
      
      
  }
}));

function clickHandler() {
  console.log("clicked")
  
}

//import EnvelopeService from '../../services/EnvelopeService';

// Dynamically renders all envelopes in the current Group > BudgetMonth > Budget > User.
export default function EnvelopeList(props) {
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
    <div className >
      <Table class size="medium" >
        <TableHead >
          <TableRow>
          <TableCell> Label </TableCell>
            <TableCell> Planned </TableCell>
            <TableCell> Spent </TableCell>
            <TableCell> Remaining </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {envelopes.map((envelope) => {
            return (<Envelope
              key={envelope.id}
              // label={envelope.label}
              // amountPlanned={envelope.amount_planned}
              envelope={envelope}
            />)
          })}
        </TableBody>
        <Envelope className></Envelope>

        <Button color="primary" variant='contained' >Add Envelope </Button>
      </Table>


    </div>
  );
}
