import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Budget from './components/Budget';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Switch>
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} />
          <PrivateRoute exact path="/" >
            <Budget />
          </PrivateRoute>
        </Switch>
      </header>
    </div>
  );
}

export default App;
