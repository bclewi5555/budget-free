import axios from 'axios';

const AuthService = {

  async signup(email, password, username, firstName, lastName) {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/signup',
        {
          email: email,
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  },
  
  login(identifier, password) {
    // server expects an email property with a value of either email or username
    axios.post('/api/v1/auth/login',
      {
        email: identifier, 
        password: password,
      }
    );
  },
  
  logout() {
    axios.get('/api/v1/auth/logout');
  }

};

export default AuthService;