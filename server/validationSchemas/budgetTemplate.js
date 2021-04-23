//import * as yup from 'yup';
const yup = require('yup');

module.exports.budgetTemplateSchema = yup.object({
  monthlyIncome: yup.number('Enter your monthly income')
    .required('montlyIncome is required')
    .positive('monthlyIncome must be positive')
    .integer('monthlyIncome must be an integer') // $1.00 will be stored/used as 100, then formatted on front end
});