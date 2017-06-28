import React, { Component } from 'react'
import styled from 'styled-components'
import responsive from 'src/libs/responsive'

@responsive
export default class Title extends Component {
  render() {
    const { responsive, visible } = this.props
    const { isMobile } = responsive

    return (
      <TitleWrapper visible={visible} isMobile={isMobile}>
        subghost
      </TitleWrapper>
    )
  }
}

const TitleWrapper = styled.div`
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
  bottom: 50%;
  color: white;
  z-index: 9999;
  font-size: 3rem;

  opacity: ${ props => props.visible ? 1 : 0 };
  letter-spacing: ${ props => props.visible ? '1rem' : '100px' };

  transition: all 1000ms ease-in-out;
`
