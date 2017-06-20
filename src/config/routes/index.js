import React from 'react'
import { Route } from 'mobx-router'

import Page from 'src/components/Page'

export default {
  index: new Route({
    path: '/',
    component: <Page />
  }),
  frame: new Route({
    path: '/frame/:frame',
    component: <Page />
  })
}
