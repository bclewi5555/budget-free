//import * as yup from 'yup';
const yup = require('yup');

module.exports.userUpdateSchema = yup.object({
  firstName: yup.string('Enter your first name')
    .max(255, 'Cannot be more than 255 characters'),
  lastName: yup.string('Enter your last name')
    .max(255, 'Cannot be more than 255 characters'),
  email: yup.string('Enter your email')
    .email('Enter a valid email')
    .max(255, 'Cannot be more than 255 characters'),
  username: yup.string('Enter your username')
    .max(255, 'Cannot be more than 255 characters'),
  password: yup.string('Enter your password')
    .min(10, 'Password must have at least 10 characters')
    .max(255, 'Cannot be more than 255 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})/,
      "Must contain at least 10 characters, one uppercase, one lowercase, one number, and one special case character"
    ),
  subscription: yup.boolean(),
  defaultBudgetId: yup.string().uuid()
  /*
    .matches(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      'Must be a valid UUID v4'
    )
    */
});