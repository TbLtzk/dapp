import styled from 'styled-components';

import CustomBlock from 'components/Base/CustomBlock';

export const StatsWrapper = styled(CustomBlock)`
  .stats-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stats-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 48px;
  }

  .stats-actions {
    display: grid;
    grid-auto-flow: column;
    gap: 16px;
  }
`;
