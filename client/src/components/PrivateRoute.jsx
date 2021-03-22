import { Redirect, Route } from 'react-router-dom';

import AuthService from '../services/AuthService';

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={({ location }) => {
      return AuthService.isAuth() === true
        ? children
        : <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
    }} />
  )
}