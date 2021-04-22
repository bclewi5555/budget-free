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

//import EnvelopeService from '../../services/EnvelopeService';

// Dynamically renders all envelopes in the current Group > BudgetMonth > Budget > User.
export default function EnvelopeList(props) {
  const classes = useStyles();
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
              key={envelope.label}
              label={envelope.label}
              amountPlanned={envelope.amount_planned}
            />)
          })}
        </TableBody>
        <Envelope className></Envelope>

        <Button color="primary" >Add Envelope </Button>
      </Table>


    </div>
  );
}
