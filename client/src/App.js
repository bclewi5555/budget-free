//import './App.css';
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Budget from './components/Budget';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AuthService from './services/AuthService';

//console.log(sessionStorage); // for reference

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    try {
      const res = await AuthService.logout();
      if (res) {
        setIsAuth(false);
        setIsLoading(false);
        window.location.href = '/login';
      }
    } catch (err) {
      return err.message
    }
  }

  return (
    <div className='App'>
      {isAuth ? <button onClick={handleClick} disabled={isLoading}>Sign Out</button> : null}
      <header className='App-header'>
        <Switch>
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} />
          <PrivateRoute isAuth={isAuth} exact={true} path="/" component={Budget} />
        </Switch>
      </header>
    </div>
  );

}

export default App;
