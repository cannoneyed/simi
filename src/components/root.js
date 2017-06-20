import React from 'react'
import { Provider } from 'mobx-react'
import { IndexRedirect, Route, Router, hashHistory } from 'react-router'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

import store from 'src/core'

const routingStore = new RouterStore()
const history = syncHistoryWithStore(hashHistory, routingStore)

import App from './App'
import Pages from './Pages'

// Initialize application data
// store.recipeStore.loadInitialData()

export function Root() {
  return (
    <Provider { ...store } routingStore={routingStore}>
      <Router history={history} >
        <Route component={App} path="/">
          <IndexRedirect to="/page/1" />
          <Route component={Pages} path="/page/:page" />
        </Route>
      </Router>
    </Provider>
  )
}
