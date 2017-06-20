import React, { Component, PropTypes as t } from 'react'
import styled from 'styled-components'

export default class Navigation extends Component {

  static propTypes = {
    close: t.func,
    next: t.func,
    previous: t.func,
  }

  render() {
    const { close, next, previous } = this.props

    return (
      <NavigationWrapper id="navigation">
        <div
          id="prevButton"
          className="zoomButton"
          data-type="prev"
          data-root=".zoomViewport"
        />
        <Prev onClick={previous}>
          { '<' }
        </Prev>
        <div
          id="closeButton"
          className="zoomButton"
          data-type="close"
          data-root=".zoomViewport"
        />
        <Close onClick={close}>
          { 'X' }
        </Close>
        <div
          id="nextButton"
          className="zoomButton"
          data-type="next"
          data-root=".zoomViewport"
        />
        <Next onClick={next}>
          { '>' }
        </Next>
      </NavigationWrapper>
    )
  }
}

const Button = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid #aaa;
  background-color: #dca;
  color: white;
  z-index: 10;
  font-size: 40px;
  line-height: 45px;
  text-align: center;
  font-family: Helvetica, sans-serif;
  cursor: pointer;
  cursor: hand;

  &:hover {
    background-color:#ba9;
    border: 1px solid #999;
  }
`

export const Prev = styled(Button)`
  left: 0px;
`

export const Next = styled(Button)`
  right: 0px;
`

export const Close = styled(Button)`
  left: 50%;
`

export const NavigationWrapper = styled.div`
  width: 800px;
  position: relative;
  margin-top: 2em;
  margin-left: auto;
  margin-right: auto;
  height: 70px;
`
