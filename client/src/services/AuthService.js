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

  async login(identifier, password) {
    // server expects an email property with a value of either email or username
    try {
      await axios.post('http://localhost:5000/api/v1/auth/login',
        {
          email: identifier,
          password: password,
        }
      );
    } catch (err) {
      console.log(err);
    }
  },

  async logout() {
    try {
      await axios.delete('http://localhost:5000/api/v1/auth/logout');
    } catch (err) {
      console.log(err);
    }
  }

};

export default AuthService;