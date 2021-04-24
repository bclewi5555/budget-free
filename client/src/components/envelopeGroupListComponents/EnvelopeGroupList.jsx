import React, {useState} from 'react';
import EnvelopeGroup from './EnvelopeGroup';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
//import EnvelopeList from './EnvelopeList'
//import Accordion from '@material-ui/core/Accordion';
//import AccordionSummary from '@material-ui/core/AccordionSummary';
//import AccordionDetails from '@material-ui/core/AccordionDetails';
//import Typography from '@material-ui/core/Typography';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import { v4 as uuidv4 } from 'uuid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import EnvelopeGroupService from '../../services/EnvelopeGroupService';
import { Alert, AlertTitle } from '@material-ui/lab';

// Dynamically renders all groups in the current BudgetMonth > Budget > User.
const useStyles = makeStyles((theme) => ({
  root: {
  //  padding: '30px',
 }, 
 title: {
     fontSize: 50,
     
 },
 button: {
   color: "primary",
   varaint: "contained"
 },
 alertDialog: {
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
},

}));

const validationSchema = yup.object({
  label: yup.string('Enter Group Name')
    .min(2, 'Must be 2 or more characters')
    .max(255, 'Cannot be more than 255 characters')
    .required('Group Name Required'),
  
});






export default function EnvelopeGroupList(props) {
  const [open, setOpen] = React.useState(false);
  
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: ''
    },
    validationSchema: validationSchema,
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
  });
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const [groups] = useState([
    {
      id: '4c2d628d-6f5e-45d6-b661-b7d4e0e210b4',
      label: 'Income'
    }, 
    {
      id: '86d86f8d-d4ad-4ffe-9191-3f4aed7cd330',
      label: 'Food'
    }
  ]) 

  // function addGroup() {
  //   var id = uuidv4()
  //   var label = prompt('Enter Label')
  //   if (label==="") return
    
    
    
  //   var newGroup = {id, label}
  //   setGroups([...groups, newGroup])
    
    

   

  return (
    <div >
      {groups.map(group => { return (<EnvelopeGroup
        budgetMonthId={props.budgetMonthId}
        key={group.id}
        groupID={group.id}
        label={group.label}
        envelopeSelection={props.envelopeSelection}
        setEnvelopeSelection={props.setEnvelopeSelection}
      />)})}
     <form onSubmit={formik.handleSubmit} className={classes.form}>
       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Add New Group
      </Button>
      <Dialog open={open}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Group</DialogTitle>
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
      {/* <Alert onClose={() => {}}>This is a success alert — check it out!</Alert> */}
      <Alert severity="error"
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
        
      >
        <AlertTitle> Error </AlertTitle>
         This is an error alert — <strong>check it out!</strong>
        
        
      </Alert>
      </form>
      
    </div>
  
    
  );

}