//import axios from 'axios';

exports.getUser = async () => {
  //const res = await fetch('/api/v1/users');
  const res = await axios.get('/api/v1/users');
  console.log(res.data);
  return res;
}