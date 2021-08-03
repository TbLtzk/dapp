import styled from 'styled-components'

import { Container } from 'react-bootstrap'

import { indents } from 'constants/style'

export const WrapContainer = styled(Container)`
  background: ${props => props.theme.colors.main};
  padding: ${indents['30']};

  h3 {
    color: ${props => props.theme.colors.white};
  }
`

export const WrapBlock = styled.div`
  height: ${props => props.block ? '100%' : '100vh'};
  display: flex;
  flex-direction: column;
  align-items: center;
`
