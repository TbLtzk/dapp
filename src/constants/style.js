import styled from 'styled-components'
import { Col } from 'react-bootstrap'
import fonts from './fonts'

export const indents = {
  10: '10px',
  15: '15px',
  20: '20px',
  30: '30px',
  40: '40px',
  45: '45px',
  50: '50px'
}

export const LoadingWrap = styled(Col)`
  text-align: center;
`

export const Circle = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${(props) => {
    switch (props.color) {
      case 'circle-white':
        return props.theme.colors.circleWhite
      case 'circle-dark':
        return props.theme.colors.circleDark
      default:
        return props.theme.colors.circleWhite
    }
  }};;
  border-radius: 50%;
  margin-right: 7px;
`

const theme = {
  fonts,
  fontSizes: ['12px', '16px', '18px', '20px', '24px', '32px', '36px', '40px', '48px'],
  spaces: [
    '4px',
    '8px',
    '12px',
    '16px',
    '20px',
    '24px',
    '32px',
    '40px',
    '48px',
    '56px',
    '64px',
    '72px',
    '80px'
  ],
  borderRadius: ['3px', '12px']
}
export default theme
