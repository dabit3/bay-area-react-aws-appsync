import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Client from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'
import config from './AppSync'

const client = new Client({
  url: config.graphqlEndpoint,
  region: config.region,
  auth: {
    type: config.authenticationType,
    apiKey: config.apiKey
  }
})

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)

ReactDOM.render(<AppWithProvider />, document.getElementById('root'));
registerServiceWorker();
