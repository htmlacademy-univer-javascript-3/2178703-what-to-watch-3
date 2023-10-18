import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { ReactNode } from 'react';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: ReactNode;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}
