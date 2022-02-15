import styled from 'styled-components'
import { indents } from 'constants/style'

export const AuctionsTabWrp = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 1fr);
  grid-column-gap: ${indents['15']};
`

export const AuctionCardBodyContainer = styled.div`
  .auction-card_elements {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    overflow: hidden;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  @media screen and (max-width: 1150px) {
    .auction-card_elements {
      display: grid;
      grid-template-columns: 1fr;
      div {
        max-width: 100%;
      }
    }
  }
`
