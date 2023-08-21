import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log(process.env.REACT_APP_BASE_URL);

root.render(
  <AuthProvider
  config={ {
      signInRedirectURL: `${process.env.REACT_APP_BASE_URL}`,
      signOutRedirectURL: `${process.env.REACT_APP_BASE_URL}`,
      clientID: `${process.env.REACT_APP_CLIENT_ID}`,
      baseUrl: `${process.env.REACT_APP_ASGARDEO_BASE_URL}`,
      scope: [ "openid","profile", "internal_login", "internal_user_mgt_view", "app_roles" ]
  } }
>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</AuthProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
