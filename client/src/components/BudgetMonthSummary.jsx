import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Doughnut } from 'react-chartjs-2';

const rawData = {
  "income": 250000,
  "budgeted": 40000,
  "leftToBudget": 210000,
  "received": 150000,
  "spent": 23000,
  "remaining": 127000,
  "groups": [
      {
          "label": "Food",
          "planned": 40000,
          "spent": 23000,
          "remaining": 17000
      }
  ]
};

const data = {
  labels: [
    'Food',
    'Housing',
    'Transportation'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [40000, 150000, 20000],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

export default function BudgetMonthSummary() {

  return (
    <Paper>
      <Doughnut data={data} />
    </Paper>
  );

}
