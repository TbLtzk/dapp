import styled from 'styled-components'

import { Container } from 'react-bootstrap'

import { indents } from 'constants/style'

export const WrapContainer = styled(Container)`
  background: ${props => props.theme.colors.oxfordBlue};
  //height: 100vh;
  padding-top: ${indents['30']};
  padding-left: ${indents['30']};
  padding-right: ${indents['30']};
  padding-bottom: 50px;
`
