import React from 'react'
import { Route } from 'mobx-router'

import Pages from 'src/components/Pages'

export default {
  pages: new Route({
    path: '/page/:page',
    component: <Pages />
  })
}
