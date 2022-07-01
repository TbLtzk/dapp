import styled from 'styled-components';

import CustomBlock from 'components/Base/CustomBlock';

export const StatsWrapper = styled(CustomBlock)`
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
    grid-template-columns: 1fr;
    gap: 5px;
  }

  .stats-actions {
    display: grid;
    grid-auto-flow: column;
    gap: 16px;
  }
`;
