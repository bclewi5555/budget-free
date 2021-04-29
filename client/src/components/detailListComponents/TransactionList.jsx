import React, {useState} from 'react';
import Transaction from './Transaction';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  date: yup.date('Enter Transaction Date')
    .required(),
  label: yup.string('Enter Group Name')
    .min(2, 'Must be 2 or more characters')
    .max(255, 'Cannot be more than 255 characters')
    .required('Group Name Required'),
  amount: yup.number('Enter Planned Amount')
    .required('Group Name Required')
});

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
  const [open, setOpen] = useState(false);
  //const [envelopes, setEnvelopes] = useState(envelopeData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: ''
    },
    validationSchema: validationSchema,
    /*
    onSubmit: async (values, props) => {
      const res = await EnvelopeGroupService.createEnvelopeGroup({
        budgetMonthId: props.budgetMonthId,
        label: values.label
      });
      if (res.status === 200) {
       console.log(res.status)
      } else{
        setOpen(false)
      }
    }
    */
  });

  // let envelopes = [];
  // if (props.groupID === '4c2d628d-6f5e-45d6-b661-b7d4e0e210b4') { // Income
  //   envelopes = [
  //     {
  //         "id": "cc56b50e-a22a-46c5-959d-d4d77b56dbee",
  //         "group_id": "4c2d628d-6f5e-45d6-b661-b7d4e0e210b4",
  //         "type": "income",
  //         "label": "Paychecks",
  //         "amount_planned": 2000,
  //         "is_starred": false,
  //         "due_date": null,
  //         "starting_balance": null,
  //         "savings_goal": null,
  //         "notes": null,
  //         "createdAt": "2021-04-23T03:46:33.650Z",
  //         "updatedAt": "2021-04-23T03:46:33.650Z",
  //         "received": 2000,
  //         transactions: [
  //           {
  //               "id": "d0ae2142-761e-4f99-b54b-6d5e4ac62f85",
  //               "envelope_id": "cc56b50e-a22a-46c5-959d-d4d77b56dbee",
  //               "type": "income",
  //               "amount": 1000,
  //               "date": "2021-04-23",
  //               "label": "Microsoft Paycheck",
  //               "reference_number": null,
  //               "notes": null,
  //               "createdAt": "2021-04-23T03:46:33.657Z",
  //               "updatedAt": "2021-04-23T03:46:33.657Z"
  //           },
  //           {
  //               "id": "8295d359-3b08-4821-8b6c-f338f7a03a6a",
  //               "envelope_id": "cc56b50e-a22a-46c5-959d-d4d77b56dbee",
  //               "type": "income",
  //               "amount": 1000,
  //               "date": "2021-04-23",
  //               "label": "Microsoft Paycheck",
  //               "reference_number": null,
  //               "notes": null,
  //               "createdAt": "2021-04-23T03:46:33.661Z",
  //               "updatedAt": "2021-04-23T03:46:33.661Z"
  //           }
  //       ]
  //     },
  //     {
  //         "id": "81991ec0-6875-4338-882a-3d34c5bb25dd",
  //         "group_id": "4c2d628d-6f5e-45d6-b661-b7d4e0e210b4",
  //         "type": "income",
  //         "label": "Bonuses",
  //         "amount_planned": 500,
  //         "is_starred": false,
  //         "due_date": null,
  //         "starting_balance": null,
  //         "savings_goal": null,
  //         "notes": null,
  //         "createdAt": "2021-04-23T03:46:33.652Z",
  //         "updatedAt": "2021-04-23T03:46:33.652Z"
  //     }
  // ]
  // } else if (props.groupID === '86d86f8d-d4ad-4ffe-9191-3f4aed7cd330') { //Food
  //   envelopes = [
  //     {
  //       label: 'Groceries',
  //       amountPlanned: 300
  //     },
  //     {
  //       label: 'Restaurants',
  //       amountPlanned: 80
  //     }
  //   ];
  // }
  
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
    <div>
    <Table>

      <TableHead >
        <TableRow >
          <TableCell>Date</TableCell>
          <TableCell>Label</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <Transaction
          defaultDate={"2021-04-28T12:00:00"}
          label="Kroger"
          amount={50}
        />
        <Transaction
          defaultDate={"2021-04-26T12:00:00"}
          label="Publix"
          amount={35}
        />
        <Transaction
          defaultDate={"2021-04-25T12:00:00"}
          label="Piggly-Wiggly"
          amount={10}
        />
      </TableBody>

    </Table>

    <form onSubmit={formik.handleSubmit} className={classes.form}>

        <Fab
          onClick={handleClickOpen}
          color="primary"
          size="medium"
          aria-label="add"
          className={classes.fab} >
          <AddIcon />
        </Fab>

        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Transaction
        </Button> */}

        <Dialog open={open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Transaction</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            {/* TODO: date picker here */}
            <TextField
              id="date"
              name="date"
              label="Date"
              type="text"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              autoComplete="off"
              // variant="outlined"
              fullWidth
            />
            <TextField
              id="label"
              name="label"
              label="Label"
              type="text"
              value={formik.values.label}
              onChange={formik.handleChange}
              error={formik.touched.label && Boolean(formik.errors.label)}
              helperText={formik.touched.label && formik.errors.label}
              autoComplete="off"
              // variant="outlined"
              fullWidth
            />
            <TextField
              id="amount"
              name="amount"
              label="Amount"
              type="text"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              autoComplete="off"
              // variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleClose}
              disabled={formik.isSubmitting}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
    
    
  );
}
