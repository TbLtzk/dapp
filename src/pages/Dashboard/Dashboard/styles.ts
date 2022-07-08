import styled from 'styled-components';
import { media } from 'styles/media';

export const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 16px;

  ${media.lessThan('large')} {
    grid-template-columns: 1fr;
  }

  .dashboard-block {
    display: grid;
    gap: 16px;
    align-content: start;
  }
`;
