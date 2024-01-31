import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const DAOProposalCardWrap = styled(Link)`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  transition: all 150ms ease-out;

  &:hover,
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderMain};
  }

  .dao-proposal-card__head {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  .dao-proposal-card__id {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .dao-proposal-card__tag {
    height: fit-content;
  }

  .dao-proposal-card__title {
    margin-top: 12px;
    max-width: 100%;
    overflow: ellipsis;
  }

  .dao-proposal-card__veto {
    margin-top: 16px;
  }

  .dao-proposal-card__quorum {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
  }

  .dao-proposal-card__progress {
    margin-top: 8px;
  }

  .dao-proposal-card__periods {
    margin-top: 20px;
  }
`;
