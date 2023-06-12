import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider
  config={ {
      signInRedirectURL: "http://localhost:3000",
      signOutRedirectURL: "http://localhost:3000",
      clientID: "8_0QVgk0nf5Lij6C2IIdsY4Jhl0a",
      baseUrl: "https://api.asgardeo.io/t/dasuorg",
      scope: [ "openid","profile" ]
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
