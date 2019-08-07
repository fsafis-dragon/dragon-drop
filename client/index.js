import ApolloClient from 'apollo-boost'
import React from 'react'
import {ApolloProvider} from 'react-apollo'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import App from './app'
import history from './history'
// establishes socket connection
import './socket'
import store from './store'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('app')
)
