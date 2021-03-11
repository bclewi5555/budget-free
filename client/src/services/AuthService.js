import axios from 'axios';

//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AuthService = {

  signup(email, password, username, firstName, lastName) {
    try {
      const res = axios.post(/*API_BASE_URL+*/'/api/v1/auth/signup',
        {
          email: email,
          password: password,
          username: username,
          firstName: firstName,
          lastName: lastName
        }
      );
      console.log(res.data);
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  login(identifier, password) {
    // server expects an email property with a value of either email or username
    console.log('[AuthService] Loggin in...');
    try {
      const res = axios.post(/*API_BASE_URL+*/'/api/v1/auth/login',
        {
          email: identifier,
          password: password,
        }
      );
      console.log(res.data);
      sessionStorage.setItem('isAuth', true);
      return res;
    } catch (err) {
      console.log(err);
      sessionStorage.setItem('isAuth', false);
      return false;
    }
  },

  logout() {
    try {
      const res = axios.post(/*API_BASE_URL+*/'/api/v1/auth/logout');
      console.log(res.data);
      sessionStorage.setItem('isAuth', false);
      return res;
    } catch (err) {
      console.log(err);
      sessionStorage.setItem('isAuth', false);
      return false;
    }
  }

};

export default AuthService;