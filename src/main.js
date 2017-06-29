// Initialize jQuery and zoomooz for imperative zoom transition management
import $ from 'jquery'
import zoomooz from './libs/zoomooz'
zoomooz($)

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { enableLogging } from 'mobx-logger'
import { useStrict } from 'mobx'
import { syncHistoryWithStore } from 'mobx-react-router'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Page from 'src/components/Page'

import * as store from 'src/core'

import injectGlobalStyles from './styles/global'
injectGlobalStyles()

const history = syncHistoryWithStore(browserHistory, store.router)

if (process.env.NODE_ENV === 'development') {
  enableLogging()
}

useStrict(true)

const App = (props) => (
  <div>
    { props.children }
  </div>
)

const rootSelector = '#app-root'
const appRoot = document.querySelector(rootSelector)
ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/subghost" component={App}>
        <IndexRoute component={Page} />
        <Route path="frame/:frame" component={Page} />
      </Route>
    </Router>
  </Provider>
), appRoot)
