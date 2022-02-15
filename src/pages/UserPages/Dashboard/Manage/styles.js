import { indents } from 'constants/style'
import styled from 'styled-components'

export const QParametersWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: ${indents['15']};
  padding-right: 12px;
  > * {
    &:nth-child(1) {
      grid-row: 1 / -1;
    }

    &:nth-child(2) {
      grid-row: span 6;
    }

    &:nth-child(3) {
      grid-row: span 2;
    }
    &:nth-child(4) {
      grid-row: span 2;
    }
  }

  @media screen and (max-width: 1420px) {
    grid-template-columns: 100%;
    padding-right: 0;
  }
`
