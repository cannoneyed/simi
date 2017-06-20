import $ from 'jquery'
import React, { Component } from 'react'
import get from 'lodash.get'
import { observer } from 'mobx-react'
import routes from 'src/config/routes'

import Navigation from 'src/components/Navigation'
import Frames from 'src/components/Frames'

import {
  Header,
  PageWrapper,
  ZoomContainer,
  ZoomViewport,
} from './styled-components'

@observer(['store'])
export default class Page extends Component {
  componentDidMount() {
    // Handle initial route-controlled transition
    const frame = this.getFrame()
    if (frame !== undefined) {
      this.selectFrame(frame)
    }
  }

  componentWillUpdate(nextProps) {
    const frame = get(nextProps.store.router, 'params.frame')
    this.selectFrame(frame)
  }

  // We'll be using 1-indexed frame numbers
  getFrame = () => {
    const frame = get(this.props.store.router, 'params.frame')
    return frame === undefined ? undefined : frame * 1
  }

  getDest = ({ isUndefined, isFirst, isLast, isOther }) => {
    const frame = this.getFrame()

    if (frame === undefined) {
      return isUndefined
    } else if (frame === 1) {
      return isFirst
    } else if (frame === Frames.length) {
      return isLast
    } else {
      return isOther
    }
  }

  goToDest = (dest) => {
    const { goTo } = this.props.store.router

    if (dest === undefined) {
      return goTo(routes.index)
    }

    goTo(routes.frame, { frame: dest })
  }

  previous = () => {
    const frame = this.getFrame()
    const dest = this.getDest({
      isUndefined: frames.length,
      isFirst: undefined,
      isLast: frame - 1,
      isOther: frame - 1,
    })

    this.goToDest(dest)
  }

  next = () => {
    const frame = this.getFrame()
    const dest = this.getDest({
      isUndefined: 1,
      isFirst: frame + 1,
      isLast: undefined,
      isOther: frame + 1,
    })

    this.goToDest(dest)
  }

  close = () => {
    this.goToDest(undefined)
  }

  selectFrame = (f) => {
    const target = f === undefined ? '#zoomContainer' : `#frame${f}`
    $(target).zoomTo({
      root: $('#zoomContainer'),
    })
  }

  handleContainerClick = () => {
    this.goToDest(undefined)
  }

  handleFrameClick = (selectedFrame) => (e) => {
    e.stopPropagation()
    this.goToDest(selectedFrame)
  }

  render() {
    const frame = this.getFrame()

    return (
      <PageWrapper>
        <Header>Subghost</Header>
        <ZoomViewport className="zoomViewport" id="zoomViewport">
          <ZoomContainer
            id="zoomContainer"
            className="zoomContainer"
            onClick={this.handleContainerClick}
            selected={frame === undefined}
          >
            { Frames.map((Frame, index) => (
              <Frame
                key={index}
                id={`frame${index + 1}`}
                onClick={this.handleFrameClick(index + 1)}
                selected={frame === index + 1}
              />
            )) }
          </ZoomContainer>
        </ZoomViewport>
        <Navigation
          frame={frame}
          close={this.close}
          next={this.next}
          previous={this.previous}
        />
      </PageWrapper>
    )
  }
}
