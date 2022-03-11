import { indents } from 'constants/style'
import styled from 'styled-components'

export const QParametersWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: ${indents['15']};
  padding-right: 12px;

  @media screen and (max-width: 1420px) {
    display: grid;
    grid-template-columns: minmax(100px, 1fr);
    padding-right: 0;
  }
`

export const QParametersTextContainer = styled.p`
  margin-top: 20px;
`
