//import axios from 'axios';

//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AuthService = {

  async signup(email, password, username, firstName, lastName) {
    try {
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
          firstName: firstName,
          lastName: lastName
        })
      });
      /*
      const res = axios.post('/api/v1/auth/signup',
        {
          email: email,
          password: password,
          username: username,
          firstName: firstName,
          lastName: lastName
        }
      );
      */
      console.log(res.json());
      console.log(res.data);
      return await res.json();
      //return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  async login(identifier, password) {
    // server expects an email property with a value of either email or username
    console.log('[AuthService] Loggin in...');
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: identifier,
          password: password
        })
      });
      /*
      const res = axios.post('/api/v1/auth/login',
        {
          email: identifier,
          password: password,
        }
      );
      */
      console.log(res.json());
      console.log(res.data);
      sessionStorage.setItem('sid', res.data);
      return await res.json();
      //return res;
    } catch (err) {
      console.log(err);
      sessionStorage.setItem('sid', null);
      return false;
    }
  },

  async validateSession() {
    try {
      const res = await fetch('/api/v1/auth/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
      //const res = axios.post('/api/v1/auth/session');
      if (!res.status(200)) {
        return false;
      }
      console.log(res.json());
      console.log(res.data);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }

  },

  async logout() {
    try {
      const res = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
      //const res = axios.post(/*API_BASE_URL+*/'/api/v1/auth/logout');
      console.log(res.json());
      console.log(res.data);
      sessionStorage.removeItem('sid');
      return await res.json();
      //return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

};

export default AuthService;