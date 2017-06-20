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

export const Item1 = styled.div`
  background-color: #fcc;
  position: absolute;
  left: 50px;
  top: 50px;
  width: 300px;
  height: 200px;
  border: 1px solid red;
`

export const Item2 = styled.div`
  background-color: #ccf;
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 300px;
  height: 200px;
  border: 1px solid blue;
`

export const Item3 = styled.div`
  background-color: #cfc;
  position: absolute;
  top: 0px;
  right: 100px;
  width: 300px;
  height: 200px;
  border: 1px solid green;
  transform: rotate(10deg) translate(0px,0px);
`

export const Item3b = styled.div`
  background-color: #cff;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 200px;
  height: 100px;
  border: 1px solid cyan;
  transform: rotate(10deg) translate(200px,200px);
`

export const Item2b = styled.div`
  background-color: #99f;
  position: absolute;
  bottom: 80px;
  right: 80px;
  width: 100px;
  height: 100px;
  border: 1px solid blue;
`

export const Item4 = styled.div`
  background-color: #ffc;
  position: absolute;
  bottom: 200px;
  left: 200px;
  width: 200px;
  height: 200px;
  border: 1px solid yellow;
  transform: rotate(30deg) skew(20deg);
`
