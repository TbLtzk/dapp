import styled from 'styled-components'

export const ProgressBarWrapper = styled.span`
  p {
    background-color: ${props => checkColor(props, props.persentage).background};
    color: ${props => checkColor(props, props.persentage).color};
    width: ${(props) => props.persentage + '%'};
    height: 15px;
    border-radius: 10px;
  }
`

const checkColor = (props, value) => {
  if (value < 80) return { background: props.theme.colors.neonGreen, color: 'black' }
  if (value >= 80 && value <= 98) return { background: props.theme.colors.validationError, color: 'black' }
  else return { background: 'red', color: 'black' }
}

// var yourVar = condition1 ? someValue
//             : condition2 ? anotherValue
//             : defaultValue;
