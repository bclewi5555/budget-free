import { Redirect, Route } from 'react-router-dom';
export default function PrivateRoute(props) {

  if (props.isAuth) {
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