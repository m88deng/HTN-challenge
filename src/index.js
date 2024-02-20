import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
// import reportWebVitals from './reportWebVitals';

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from './App.js';

const client = new ApolloClient({
  uri: "https://api.hackthenorth.com/v3/graphql",
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);


