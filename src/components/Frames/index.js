import styled from 'styled-components'

const Frame = styled.div`
  position: absolute;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: ${ props => props.selected ? 10 : 0 };
  opacity: ${props => props.selected ? 1 : 0.1 };
  transition: all 2000ms linear;
  backface-visibility: hidden;
  cursor: ${ props => props.selected ? 'default!important' : 'pointer' };
`

export const Frame1 = styled(Frame)`
  background-image: url('https://farm6.staticflickr.com/5680/30646057313_9725d5b621_o.jpg');
  left: 50px;
  top: 50px;
  width: 500px;
  height: 300px;
`

export const Frame2 = styled(Frame)`
  background-image: url('https://farm6.staticflickr.com/5571/31308574842_ece2014cc8_o.jpg');
  bottom: 40px;
  right: 40px;
  width: 400px;
  height: 240px;
`

export const Frame3 = styled(Frame)`
  background-image: url('https://farm6.staticflickr.com/5686/30646057073_6912f92e97_o.jpg');
  top: 0px;
  right: 0px;
  width: 300px;
  height: 200px;
  transform: rotate(10deg) translate(0px,0px);
`

export const Frame4 = styled(Frame)`
  background-image: url('https://farm6.staticflickr.com/5726/31308575282_466bbbe651_o.jpg');
  top: 400px;
  left: -20px;
  width: 200px;
  height: 100px;
  transform: rotate(10deg);
`

export const Frame5 = styled(Frame)`
  background-image: url('https://farm6.staticflickr.com/5616/30646056923_e4cc3917dc_o.jpg');
  bottom: 80px;
  right: 80px;
  width: 100px;
  height: 100px;
`

export const Frame6 = styled(Frame)`
  background-image: url('https://farm6.staticflickr.com/5802/30646056643_aebea4a608_o.jpg');
  bottom: 200px;
  left: 200px;
  width: 200px;
  height: 200px;
  transform: rotate(30deg) skew(20deg);
`

export const Frame7 = styled(Frame)`
  background-image: url('https://farm6.staticflickr.com/5675/31308574432_632e36555f_o.jpg');
  bottom: -200px;
  right: -200px;
  width: 300px;
  height: 200px;
  transform: rotate(-30deg) ;
`

export default [{
  Frame: Frame1,
  caption: 'Here\'s looking at you, kid',
}, {
  Frame: Frame2,
  caption: 'A gift from above...',
}, {
  Frame: Frame3,
  caption: 'What\'s it going to be, then?',
}, {
  Frame: Frame4,
  caption: 'It was the best of times, it was the worst of times',
}, {
  Frame: Frame5,
  caption: 'Never gonna get it never gonna get it',
}, {
  Frame: Frame6,
  caption: 'Some more things, please',
}, {
  Frame: Frame7,
  caption: 'And who knows about you?',
}]
