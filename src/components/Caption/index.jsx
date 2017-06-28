import React, { Component } from 'react'
import styled from 'styled-components'
import responsive from 'src/libs/responsive'

@responsive
export default class Caption extends Component {
  state = {
    fade: 'out',
    caption: '',
  }

  componentDidMount() {
    if (this.props.caption) {
      this.fade('in', this.props.caption, 500)
    }
  }

  componentWillReceiveProps(nextProps) {
    const prev = this.props.caption
    const next = nextProps.caption

    if (prev === '' && next) {
      this.fade('out', prev)
      this.fade('in', next, 500)
    } else if (prev !== next) {
      this.fade('out', prev)
      this.fade('in', next, 500)
    }
  }

  fade = (inOut, caption, time = 0) => {
    setTimeout(() => this.setState({
      fade: inOut,
      caption,
    }), time)
  }

  render() {
    const { responsive } = this.props
    const { isMobile } = responsive
    const { caption, fade } = this.state

    return (
      <CaptionWrapper fade={fade} isMobile={isMobile}>
        { caption }
      </CaptionWrapper>
    )
  }
}

const CaptionWrapper = styled.div`
  margin-bottom: ${ props => props.isMobile ? 20 : 40 }px;
  padding-left: ${ props => props.isMobile ? 30 : 60 }px;
  padding-right: ${ props => props.isMobile ? 30 : 60 }px;
  width: 100%;
  box-sizing: border-box;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  text-align: center;
  bottom: 0;
  color: white;
  z-index: 9999;
  font-size: 1.5rem;

  opacity: ${ props => props.fade === 'in' ? 1 : 0 };

  transition: all 500ms linear;
`
