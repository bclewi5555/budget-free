//import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10,
    paddingBottom: 10
  }
}));

const rawData = {
  "income": 250000,
  "budgeted": 0,
  "leftToBudget": 0,
  "received": 150000,
  "spent": 0,
  "remaining": 0,
  "groups": [
    {
      "label": "Food",
      "planned": 30000,
      "spent": 12000,
      "remaining": 18000
    },
    {
      "label": "Housing",
      "planned": 150000,
      "spent": 150000,
      "remaining": 0
    },
    {
      "label": "Transportation",
      "planned": 20000,
      "spent": 5000,
      "remaining": 15000
    },
    {
      "label": "Giving",
      "planned": 25000,
      "spent": 15000,
      "remaining": 10000
    }
  ]
};

for (let i = 0; i < rawData.groups.length; i++) {
  rawData.budgeted += rawData.groups[i].planned;
  rawData.spent += rawData.groups[i].spent;
}
rawData.leftToBudget = rawData.income - rawData.budgeted;
rawData.remaining = rawData.received - rawData.spent;

const data = {
  labels: [], // calculated below
  datasets: [{
    label: 'Planned Income: '+rawData.income/100,
    data: [], // calculated below
    borderColor: '#fff',
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(235, 100, 235)'
    ],
    hoverOffset: 4
  }]
};
const plannedDataset = data.datasets[0];

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: plannedDataset.label,
      font: {
        family: 'Arial',
        weight: 'bold',
        size: '18'
      },
      padding: {
        top: 0,
        bottom: 10
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      align: 'center',
      labels: {
        boxWidth: 12,
        color: '#444',
      }
    },
    tooltip: {
      enabled: true,
      displayColors: false,
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }
  }
};

for (let i = 0; i < rawData.groups.length; i++) {
  plannedDataset.data.push(rawData.groups[i].planned / 100);
  data.labels.push(rawData.groups[i].label);
}
plannedDataset.data.push(rawData.leftToBudget / 100);
data.labels.push('Left to Budget');
plannedDataset.backgroundColor.push('rgb(200, 200, 200)');
//plannedDataset.weight.push(0.5);



export default function BudgetMonthSummary() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Doughnut data={data} options={options} />
    </Paper>
  );

}
