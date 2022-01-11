import styled from 'styled-components'

import { Container } from 'react-bootstrap'

import { indents } from 'constants/style'

export const WrapContainer = styled(Container)`
  background: ${props => props.theme.colors.main};

  h3 {
    color: ${props => props.theme.colors.white};
  }
`

export const WrapBlock = styled.div`
  height: ${props => props.block ? '100%' : '100vh'};
  display: flex;
  padding-top: ${indents['30']};
  flex-direction: column;
  align-items: center;
`
