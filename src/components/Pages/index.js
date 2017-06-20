import $ from 'jquery'
import React, { Component, PropTypes as t } from 'react'

import {
  Header,
  Item1,
  Item2,
  Item2b,
  Item3,
  Item3b,
  Item4,
  Navigation,
  Next,
  PageWrapper,
  Prev,
  ZoomContainer,
  ZoomViewport,
} from './styled-components'



export default class Pages extends Component {

  static propTypes = {
    params: t.shape({
      page: t.string,
    }),
  }

  onClickPrev = () => {
    console.log('prev!')
    $('#prevButton').click()
  }

  onClickNext = () => {
    console.log('next!')
    $('#nextButton').click()
  }

  render() {
    return (
      <PageWrapper>
        <Header>Subghost</Header>
        <ZoomViewport className="zoomViewport">
          <ZoomContainer id="container" className="zoomContainer">
            <Item1 id="item1" className="zoomTarget" />
            <Item2 id="item2" className="zoomTarget" />
            <Item2b id="item2b" className="zoomTarget" />
            <Item3 id="item3" className="zoomTarget">
              <Item3b id="item3b" className="zoomTarget" />
            </Item3>
            <Item4 id="item4" className="zoomTarget" />
          </ZoomContainer>
        </ZoomViewport>
        <Navigation id="navigation">
          <div
            id="prevButton"
            className="zoomButton"
            data-type="prev"
            data-root=".zoomViewport"
          />
          <Prev onClick={this.onClickPrev}>
            { '<' }
          </Prev>
          <div
            id="nextButton"
            className="zoomButton"
            data-type="next"
            data-root=".zoomViewport"
          />
          <Next onClick={this.onClickNext}>
            { '>' }
          </Next>
        </Navigation>
      </PageWrapper>
    )
  }
}
