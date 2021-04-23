import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import 'date-fns';

function App() {
  
  
  return (
    <div className='App'>
      <header className='App-header'>
        <Switch>
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} />
          {/* TODO <Route path="/settings" component={Settings} /> */}
          <PrivateRoute exact path="/" >
            <Home />
          </PrivateRoute>
        </Switch>
      </header>
    </div>
  );
}

export default App;
