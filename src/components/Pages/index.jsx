import $ from 'jquery'
import React, { Component, PropTypes as t } from 'react'

import Navigation from 'src/components/Navigation'

import {
  Header,
  Item1,
  Item2,
  Item2b,
  Item3,
  Item3b,
  Item4,
  PageWrapper,
  ZoomContainer,
  ZoomViewport,
} from './styled-components'

let items = [
  'item1',
  'item2',
  'item2b',
  'item3',
  'item3b',
  'item4',
]

let index = null

export default class Pages extends Component {

  static propTypes = {
    params: t.shape({
      page: t.string,
    }),
  }

  setIndex = ({ isNull, isZero, isLast, isOther }) => {
    if (index === null) {
      index = isNull
    } else if (index === 0) {
      index = isZero
    } else if (index === items.length - 1) {
      index = isLast
    } else {
      index = isOther
    }
  }

  previous = () => {
    this.setIndex({
      isNull: items.length - 1,
      isZero: null,
      isLast: index - 1,
      isOther: index - 1,
    })

    if (index === null) {
      return this.close()
    }

    $('#prevButton').click()
  }

  next = () => {
    this.setIndex({
      isNull: 0,
      isZero: index + 1,
      isLast: null,
      isOther: index + 1,
    })

    if (index === null) {
      return this.close()
    }

    $('#nextButton').click()
  }

  close = () => {
    $('#closeButton').click()
  }

  zoomToItem = (i) => {
    const target = i === null ? '#zoomContainer' : `#item${i}`

    $(target).zoomTo({
      root: $('#zoomContainer'),
    })
  }

  render() {
    return (
      <PageWrapper>
        <Header>Subghost</Header>
        <ZoomViewport className="zoomViewport" id="zoomViewport">
          <ZoomContainer id="zoomContainer" className="zoomContainer">
            <Item1 id="item1" className="zoomTarget" />
            <Item2 id="item2" className="zoomTarget" />
            <Item2b id="item2b" className="zoomTarget" />
            <Item3 id="item3" className="zoomTarget">
              <Item3b id="item3b" className="zoomTarget" />
            </Item3>
            <Item4 id="item4" className="zoomTarget" />
          </ZoomContainer>
        </ZoomViewport>
        <Navigation
          close={this.close}
          next={this.next}
          previous={this.previous}
        />
      </PageWrapper>
    )
  }
}
