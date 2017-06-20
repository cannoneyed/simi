import React from 'react'
import ReactDOM from 'react-dom'
import { enableLogging } from 'mobx-logger'
import { useStrict } from 'mobx'

import { Root } from './components/root'

// Initialize jQuery and zoomooz for imperative zoom transition management
import $ from 'jquery'
import zoomooz from './libs/zoomooz'
zoomooz($)

enableLogging()
useStrict(true)

const rootSelector = '#app-root'
const appRoot = document.querySelector(rootSelector)
ReactDOM.render(<Root />, appRoot)
