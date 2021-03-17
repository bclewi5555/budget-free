import { Redirect, Route } from 'react-router-dom';
//import AuthService from '../services/AuthService';

export default function PrivateRoute(props) {

  if (/*AuthService.validateSession()*/props.isAuth) {
    return(
      <Route 
        exact={props.exact}
        path={props.path}
        component={props.component}
      />
    );
  }
  return(
    <Redirect to='/login' />
  );
  
}