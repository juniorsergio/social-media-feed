import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { CurrentUserProvider } from './hooks/useCurrentUser'
import { FeedProvider } from './hooks/useFeed'
import { client } from './lib/apollo'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <CurrentUserProvider>        
          <FeedProvider>         
            <App />
          </FeedProvider>
        </CurrentUserProvider>
    </ApolloProvider>
  </React.StrictMode>
)