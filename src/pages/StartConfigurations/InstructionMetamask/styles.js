import styled from 'styled-components'

import { indents } from 'constants/style'

export const WrapContainer = styled.div`
  p, h4, ul{
    color: ${props => props.theme.colors.white};
  }
`

export const WrapImgs = styled.div`
  padding-bottom: ${indents['10']};
`

export const Image = styled.img`
  height: 45px;
  padding-left: ${indents['10']};
  padding-right: ${indents['10']};

`
