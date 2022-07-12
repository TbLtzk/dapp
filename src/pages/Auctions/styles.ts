import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const AuctionsTabWrp = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 1fr);
  grid-column-gap: 15px;
`;

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
`;

export const AuctionCardLink = styled(Link)`
  background-color: ${({ theme }) => theme.colors.block};
  transition: all 150ms ease-out;
  &:hover,
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blockBorderHover};
  }

  .auction-card__head {
    display: flex;
    justify-content: space-between;
  }

  .auction-card__id {
    display: flex;
    gap: 8px;
  }

  .auction-card__title {
    margin-top: 12px;
    margin-bottom: 12px;
  }


  .auction-card__info {
    margin-top: 8px;
    margin-bottom: 10px;
  }

  .auction-card__periods {
    margin-top: 20px;
  }
`;

export const AuctionPeriodsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);

  div:nth-child(2) {
    text-align: right;
  }
`;

export const EmptyList = styled.div` 
  margin-top: 25px;
  text-align: center;
`;
export const AuctionContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 32px;
  height: calc(100vh - 72px);
  max-height: calc(100vh - 72px);
`;

export const ListWrapper = styled.div`  
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media screen and (max-width: 1150px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
