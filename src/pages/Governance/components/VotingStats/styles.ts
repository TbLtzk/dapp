import styled from 'styled-components';

export const StatsContainer = styled.div`
  margin: 24px 0 40px;

  .stats-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stats-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .stats-item {
    display: grid;
    gap: 4px;
    align-content: start;
    padding: 24px;

    &:not(:first-child) {
      border-left: 1px solid ${({ theme }) => theme.colors.blockDivider};
    }
  }

  .stats-item-lbl {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .stats-item-val {
    display: grid;
  }
`;
