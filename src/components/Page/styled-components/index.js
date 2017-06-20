import styled from 'styled-components'

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const ZoomContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 800px;
  height: 600px;
  position: relative;
  ${ props => props.selected ? '' : 'cursor: pointer;' };
`

export const ZoomViewport = styled.div`
  margin: 0;
  padding: 0;
  width: 800px;
  height: 600px;
  border: 1px solid #ccc;
  background-color: white;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
`

export const Header = styled.h3`
  font-family: Helvetica Neue, Helvetica, sans-serif;
  display: block;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  color: #444;
`
