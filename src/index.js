import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import App from './components/App';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    operation.setContext({
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
