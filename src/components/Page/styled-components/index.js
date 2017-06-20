import styled from 'styled-components'

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`

export const ZoomViewport = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: hidden;
  ${ props => props.selected ? '' : 'cursor: pointer;' };
`

export const ZoomContainer = styled.div`
  width: 100%;
  height: 100%;
`
