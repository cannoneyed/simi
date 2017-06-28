import $ from 'jquery'
import React, { Component } from 'react'
import get from 'lodash.get'
import { observer } from 'mobx-react'
import routes from 'src/config/routes'

import Caption from 'src/components/Caption'
import Frames from 'src/components/Frames'
import Navigation from 'src/components/Navigation'
import Title from 'src/components/Title'

import {
  PageWrapper,
  ZoomContainer,
  ZoomViewport,
} from './styled-components'

@observer(['store'])
export default class Page extends Component {
  componentDidMount() {
    const audioStore = this.props.store.audio

    // Handle initial route-controlled transition
    const frame = this.getFrame()
    if (frame !== undefined) {
      this.selectFrame(frame)
    }
    audioStore.playIndex(frame || 0)
  }

  componentWillUpdate(nextProps) {
    const frame = get(nextProps.store.router, 'params.frame')
    const audioStore = nextProps.store.audio

    audioStore.playIndex(frame || 0)
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
      isUndefined: Frames.length,
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
      duration: 1000,
    })
  }

  handleOutsideClick = () => {
    this.goToDest(undefined)
  }

  handleFrameClick = (selectedFrame) => (e) => {
    e.stopPropagation()
    this.goToDest(selectedFrame)
  }

  renderCaption = () => {
    const selectedFrame = this.getFrame()

    let caption
    if (selectedFrame !== undefined) {
      caption = Frames[selectedFrame - 1].caption
    } else {
      caption = ''
    }

    return (
      <Caption caption={caption} />
    )
  }

  renderTitle = () => {
    const selectedFrame = this.getFrame()

    return (
      <Title visible={selectedFrame === undefined} />
    )
  }

  render() {
    const selectedFrame = this.getFrame()

    return (
      <PageWrapper>
        <Navigation
          frame={selectedFrame}
          close={this.close}
          next={this.next}
          previous={this.previous}
        />
        { this.renderCaption() }
        { this.renderTitle() }
        <ZoomViewport
          className="zoomViewport"
          id="zoomViewport"
          onClick={this.handleOutsideClick}
          selected={selectedFrame === undefined}
        >
          <ZoomContainer
            id="zoomContainer"
            className="zoomContainer"
          >
            { Frames.map(({ Frame }, index) => {
              return (
                <Frame
                  key={index}
                  id={`frame${index + 1}`}
                  onClick={this.handleFrameClick(index + 1)}
                  selected={selectedFrame === index + 1}
                />
              )
            }) }
          </ZoomContainer>
        </ZoomViewport>
      </PageWrapper>
    )
  }
}
