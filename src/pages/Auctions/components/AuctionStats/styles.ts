import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

export const AuctionStatsContainer = styled.div`
  display: flex;

  ${media.lessThan('medium')} {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
  
  .block {
    margin-right: 10px;
    display: flex;
    height: auto;
    flex-direction: column;

    ${media.lessThan('medium')} {
      min-width: 90%;
      scroll-snap-align: start;
    }
  }

  .auction-item {
    padding: 10px;
    &:first-child {
      margin-top: 10px;
    }
    &:not(:first-child) {
      border-left: none;
    }
  }

  .buttons {
    margin-top: 16px
  }
`;
