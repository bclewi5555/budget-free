import axios from 'axios';

const AuthService = {

  signup(email, username, password, firstName, lastName) {
    console.log('[AuthService] Signing Up...');
    axios.post('/api/v1/auth/signup',
      {
        email: email,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
      }
    );
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