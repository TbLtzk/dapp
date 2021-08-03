import styled from 'styled-components'
import { indents } from 'constants/style'

export const ProposalsTabWrp = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 1fr);
  grid-column-gap: ${indents['15']};
`
