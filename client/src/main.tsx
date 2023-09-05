import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react';
import './reset.css';

const { VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENT_ID: clientId, VITE_AUTH0_AUDIENCE: audience } = import.meta.env
const redirectUri: string = window.location.origin + "/moviehub"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: redirectUri,
      audience: audience
    }}
  >
    <App />

  </Auth0Provider>

)
