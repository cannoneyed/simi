import React, { Component, PropTypes as t } from 'react'
import styled from 'styled-components'
import responsive from 'src/libs/responsive'

import Icon from 'src/components/Icon'

@responsive
export default class Navigation extends Component {

  static propTypes = {
    close: t.func,
    next: t.func,
    previous: t.func,
  }

  render() {
    const { close, next, previous, responsive } = this.props
    const { isMobile } = responsive

    const iconSize = isMobile ? 40 : 60

    return (
      <NavigationWrapper id="navigation" isMobile={isMobile}>
        <Button onClick={previous} size={iconSize}>
          <Icon
            size={iconSize}
            color="white"
            type="left"
          />
        </Button>
        <Button onClick={close} size={iconSize}>
          <Icon
            size={iconSize}
            color="white"
            type="close"
          />
        </Button>
        <Button onClick={next} size={iconSize}>
          <Icon
            size={iconSize}
            color="white"
            type="right"
          />
        </Button>
      </NavigationWrapper>
    )
  }
}

const Button = styled.div`
  color: white;
  z-index: 10;
  cursor: pointer;

  border-radius: 50%;

  &:hover {
    color: #B5EF8A;
  }

  transition: all 200ms linear;
`

export const NavigationWrapper = styled.div`
  margin-top: ${ props => props.isMobile ? 10 : 20 }px;
  padding-left: ${ props => props.isMobile ? 30 : 60 }px;
  padding-right: ${ props => props.isMobile ? 30 : 60 }px;
  width: 100%;
  box-sizing: border-box;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
