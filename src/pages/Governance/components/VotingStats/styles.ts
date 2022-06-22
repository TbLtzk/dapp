import styled from 'styled-components';

import CustomBlock from 'components/Base/CustomBlock';

export const StatsWrapper = styled(CustomBlock)<{ $row: boolean }>`
  margin-top: ${({ $row }) => $row ? 0 : '24px'};

  .stats-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stats-title {
    margin-bottom: 0;
  }

  .stats-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: ${({ $row }) => $row ? '1fr' : 'repeat(4, 1fr)'};
    gap: ${({ $row }) => $row ? '5px' : '48px'};
    gap: 5px;
  }

  .stats-actions {
    display: grid;
    grid-auto-flow: column;
    gap: 16px;
  }
`;
