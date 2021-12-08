import styled from 'styled-components'

import { Container } from 'react-bootstrap'

import { indents } from 'constants/style'

export const WrapContainer = styled(Container)`
  background: ${(props) => props.theme.colors.oxfordBlue};
  padding-top: ${indents['30']};
  padding-left: ${indents['30']};
  padding-right: ${indents['30']};
  padding-bottom: 50px;
`

export const WrapSpinner = styled.div`
  display: flex;
  height: 260px;
  align-items: center;
  justify-content: center;
`
