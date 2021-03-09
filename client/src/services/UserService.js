import axios from 'axios';

exports.getUser = () => {
  axios.get('/api/v1/user');
}