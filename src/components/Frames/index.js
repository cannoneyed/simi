import styled from 'styled-components'

const Frame = styled.div`
  position: absolute;
  ${ props => props.selected ? 'cursor: default!important' : 'cursor: pointer' };
`

export const Frame1 = styled(Frame)`
  background-color: #fcc;
  left: 50px;
  top: 50px;
  width: 300px;
  height: 200px;
  border: 1px solid red;
`

export const Frame2 = styled(Frame)`
  background-color: #ccf;
  bottom: 40px;
  right: 40px;
  width: 300px;
  height: 200px;
  border: 1px solid blue;
`

export const Frame3 = styled(Frame)`
  background-color: #cfc;
  top: 0px;
  right: 100px;
  width: 300px;
  height: 200px;
  border: 1px solid green;
  transform: rotate(10deg) translate(0px,0px);
`

export const Frame4 = styled(Frame)`
  background-color: #cff;
  top: 0px;
  left: 0px;
  width: 200px;
  height: 100px;
  border: 1px solid cyan;
  transform: rotate(10deg) translate(200px,200px);
`

export const Frame5 = styled(Frame)`
  background-color: #99f;
  bottom: 80px;
  right: 80px;
  width: 100px;
  height: 100px;
  border: 1px solid blue;
`

export const Frame6 = styled(Frame)`
  background-color: #ffc;
  bottom: 200px;
  left: 200px;
  width: 200px;
  height: 200px;
  border: 1px solid yellow;
  transform: rotate(30deg) skew(20deg);
`

export default [
  Frame1,
  Frame2,
  Frame3,
  Frame4,
  Frame5,
  Frame6,
]
