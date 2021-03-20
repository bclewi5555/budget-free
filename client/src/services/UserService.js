//import axios from 'axios';

exports.getUser = async () => {
  //const res = await fetch('/api/v1/user');
  const res = await axios.get('/api/v1/user');
  console.log(res.data);
  return res;
}