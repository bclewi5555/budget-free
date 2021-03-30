import axios from 'axios';

//console.log(sessionStorage); // for reference

const AuthService = {

  _isAuth: false,

  isAuth() {
    return this._isAuth ? true : false;
  },

  async signup(user) {
    console.log('[AuthService] Signing up...');
    try {
      const res = await axios.post('/api/v1/auth/signup',
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          password: user.password,
          subscription: user.subscription
        }
      );
      if (res.status !== 200) {
        console.log(res);
        return false;
      }
      console.log('[AuthService] Done: Signed up user with ID: '+res.data.id);
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  async login(user) {
    // server expects an email property with a value of either email or username
    console.log('[AuthService] Logging in...');
    try {
      const res = await axios.post('/api/v1/auth/login',
        {
          identifier: user.identifier,
          password: user.password,
        }
      );
      if (res.status !== 200) {
        console.log(res);
        return false;
      }
      sessionStorage.setItem('sid', res.data.sessionID);
      this._isAuth = true;
      console.log('[AuthService] Done: Issued and Stored Session ID: '+sessionStorage.getItem('sid'));
      return res;
    } catch (err) {
      console.log(err);
      sessionStorage.setItem('sid', null);
      this._isAuth = false;
      return false;
    }
  },

  async validateSession() {
    console.log('[AuthService] Validating session...');
    try {
      const res = await axios.post('/api/v1/auth/session');
      console.log(res);
      if (res.status !== 200) {
        console.log(res);
        return false;
      }
      this._isAuth = true;
      //return res;
      return true;
    } catch (err) {
      console.log(err);
      this._isAuth = false;
      return false;
    }

  },

  async logout() {
    console.log('[AuthService] Logging out...');
    try {
      const res = await axios.post('/api/v1/auth/logout');
      if (res.status !== 200) {
        console.log(res);
        return false;
      }
      const destroyedSessionID = sessionStorage.getItem('sid');
      sessionStorage.removeItem('sid');
      this._isAuth = false;
      console.log('[AuthService] Done: Destroyed Session ID: '+destroyedSessionID);
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

};

export default AuthService;