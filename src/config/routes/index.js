import React from 'react'
import { Route } from 'mobx-router'

import Page from 'src/components/Page'



export default {
  index: new Route({
    path: '/subghost/',
    component: <Page />
  }),
  frame: new Route({
    path: '/subghost/frame/:frame',
    component: <Page />
  })
}
