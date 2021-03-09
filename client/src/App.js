//import './App.css';
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Budget from './components/Budget';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  function handleClick() {
    setIsAuth(false);
  }

  return (
    <div className='App'>
      {isAuth ? <button onClick={handleClick}>Sign Out</button> : null}
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
