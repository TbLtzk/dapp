import styled from 'styled-components'
import { indents } from 'constants/style'

export const WrapContainer = styled.div`
  padding: ${indents['30']};

  h3 {
    color: ${(props) => props.theme.colors.white};
  }
`
