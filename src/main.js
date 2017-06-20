// Initialize jQuery and zoomooz for imperative zoom transition management
import $ from 'jquery'
import zoomooz from './libs/zoomooz'
zoomooz($)

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { enableLogging } from 'mobx-logger'
import { useStrict } from 'mobx'
import { MobxRouter, startRouter } from 'mobx-router'

import routes from 'src/config/routes'
import * as store from 'src/core'

import injectGlobalStyles from './styles/global'
injectGlobalStyles()

startRouter(routes, store)

enableLogging()
useStrict(true)

const rootSelector = '#app-root'
const appRoot = document.querySelector(rootSelector)
ReactDOM.render((
  <Provider store={store}>
    <MobxRouter />
  </Provider>
), appRoot)
