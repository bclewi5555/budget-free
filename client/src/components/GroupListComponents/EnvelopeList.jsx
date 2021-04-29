// Dynamically renders all envelopes in the current Group > BudgetMonth > Budget > User.

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Envelope from './Envelope';
import Button from '@material-ui/core/Button'
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import SelectEnvelope from './SelectEnvelope';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
//import EnvelopeService from '../../services/EnvelopeService';

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

const validationSchema = yup.object({
  label: yup.string('Enter Group Name')
    .min(2, 'Must be 2 or more characters')
    .max(255, 'Cannot be more than 255 characters')
    .required('Group Name Required'),
  planned: yup.number('Enter Planned Amount')
    .required('Group Name Required')
});

export default function EnvelopeList(props) {
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
  // if (props.groupId === '4c2d628d-6f5e-45d6-b661-b7d4e0e210b4') { // Income
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

        <TableHead>
          <TableRow>
            <TableCell> Label </TableCell>
            <TableCell> Planned </TableCell>
            <TableCell>
              {props.groupId === '4c2d628d-6f5e-45d6-b661-b7d4e0e210b4' ? // income
                <Typography size='small'>Received</Typography>
                :
                <SelectEnvelope envelopeView={props.envelopeView} setEnvelopeView={props.setEnvelopeView} />
              }
              
            </TableCell>
          </TableRow>
        </TableHead>

        {props.groupId === '86d86f8d-d4ad-4ffe-9191-3f4aed7cd330' ? // food
            (<TableBody>
              <Envelope
                incomeType={false}
                label="Groceries"
                planned={200}
                spent={100}
                remaining={100}
                envelopeView={props.envelopeView}
              />
              <Envelope
                incomeType={false}
                label="Restaurants"
                planned={100}
                spent={60}
                remaining={40}
                envelopeView={props.envelopeView}
              />
            </TableBody>)
            :
            (<TableBody>
              <Envelope
                incomeType={true}
                label="Paycheck 1"
                planned={1000}
                received={1000}
                envelopeView={props.envelopeView}
              />
              <Envelope
                incomeType={true}
                label="Paycheck 2"
                planned={1000}
                received={0}
                envelopeView={props.envelopeView}
              />
              <Envelope
                incomeType={true}
                label="Bonus"
                planned={500}
                received={0}
                envelopeView={props.envelopeView}
              />
            </TableBody>)
          }

      </Table>

      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <IconButton
          edge="start"
          color="primary"
          onClick={handleClickOpen}
          aria-label="open"
        >
          <AddIcon />
        </IconButton>
      <Dialog open={open}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Envelope</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
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
                id="planned"
                name="planned"
                label="Amount"
                type="text"
                value={formik.values.planned}
                onChange={formik.handleChange}
                error={formik.touched.planned && Boolean(formik.errors.planned)}
                helperText={formik.touched.planned && formik.errors.planned}
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
            disabled={formik.isSubmitting}
            color="primary"
            // variant="contained"
            
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </form>

    </div>
  );

}
