export const Auth0Config = {
  domain: 'YOUR_AUTH0_DOMAIN', // e.g., 'your-domain.auth0.com'
  clientId: 'YOUR_CLIENT_ID', // from Auth0 dashboard
  redirectUri: 'yourredirecturi', // from Auth0 dashboard
  audience: 'https://your-auth0-domain/api/v2/', // audience for API calls
  scope: 'openid profile email', // adjust scopes as needed
};