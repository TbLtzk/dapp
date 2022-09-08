import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

export const AuctionNotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 72px);
`;
export const AuctionLayoutContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.block};
  transition: all 150ms ease-out;

  .text-h2 {
    margin-bottom: 24px;
  }

  .auction-card__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .auction-card__row {
    display: flex;
    width: 100%;
    margin-bottom: 20px;

    ${media.lessThan('medium')} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    
    > * {
      &:first-child {
        width: 160px;

        ${media.lessThan('medium')} {
          width: auto;
        }
      }
    }
  }

  .auction-card__info {
    display: flex;
    width: 160px;
    justify-content: space-between;
    align-items: center;
  }

  .auction-card__id {
    align-items: center;
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
