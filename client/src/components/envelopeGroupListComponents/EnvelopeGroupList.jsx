import React from 'react';
import EnvelopeGroup from './EnvelopeGroup';
import { makeStyles } from '@material-ui/core/styles';

// Dynamically renders all groups in the current BudgetMonth > Budget > User.
const useStyles = makeStyles((theme) => ({
  root: {
  //  padding: '30px',
 }, 
 title: {
     fontSize: 25,
     
 }
}));

export default function EnvelopeGroupList(props) {
  const classes = useStyles();

  const groups = [
    {
      id: '4c2d628d-6f5e-45d6-b661-b7d4e0e210b4',
      label: 'Income'
    }, 
    {
      id: '86d86f8d-d4ad-4ffe-9191-3f4aed7cd330',
      label: 'Food'
    }
  ];

  return (
    <div className={classes.root}>
      {groups.map(group => { return (<EnvelopeGroup
        budgetMonth={props.budgetMonth}
        key={group.id}
        groupID={group.id}
        label={group.label}
        envelopeSelection={props.envelopeSelection}
        setEnvelopeSelection={props.setEnvelopeSelection}
      />)})}
    </div>
  );

}