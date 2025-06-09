import {
  AuthenticationContext,
  ProvideAuthentication,
} from '@auth0/react-native-auth0';
import {Auth0Config} from '../config';
export const auth0 = new AuthenticationContext(Auth0Config);

export const ProvideAuth = ({children}) => {
  return (
    <ProvideAuthentication authentication={auth0}>
      {children}
    </ProvideAuthentication>
  );
};