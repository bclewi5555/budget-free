import axios from 'axios';

const AuthService = {

  async signup(email, password, username, firstName, lastName) {
    try {
      /*
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
      */
      const res = await axios.post('/api/v1/auth/signup',
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

  async login(identifier, password) {
    // server expects an email property with a value of either email or username
    console.log('[AuthService] Loggin in...');
    try {
      /*
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: identifier,
          password: password
        })
      });
      */
      const res = await axios.post('/api/v1/auth/login',
        {
          email: identifier,
          password: password,
        }
      );
      console.log(res.data);
      sessionStorage.setItem('sid', res.data);
      return res;
      //return res;
    } catch (err) {
      console.log(err);
      sessionStorage.setItem('sid', null);
      return false;
    }
  },

  async validateSession() {
    try {
      /*
      const res = await fetch('/api/v1/auth/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
      */
      const res = await axios.post('/api/v1/auth/session');
      if (!res.status(200)) {
        return false;
      }
      console.log(res.data);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }

  },

  async logout() {
    try {
      /*
      const res = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
      */
      const res = await axios.post('/api/v1/auth/logout');
      console.log(res.data);
      sessionStorage.removeItem('sid');
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

};

export default AuthService;