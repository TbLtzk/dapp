import styled from 'styled-components';

export const AuctionStatsContainer = styled.div`
  display: flex;
  .block {
    margin-right: 10px;
    display: flex;
    height: auto;
    flex-direction:column;
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
    margin-top:auto;
  }
`;
