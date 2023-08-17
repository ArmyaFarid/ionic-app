import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000/',
    cache: new InMemoryCache(),
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>,
  </React.StrictMode>
);
