import { ReactNode } from 'react';

import styled from 'styled-components';

const StyledFooter = styled.div`
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSecondary};

  &.monitoring-governance-footer--presence {
    min-height: 40px;
    display: flex;
    align-items: center;
  }
`;

interface Props {
  children: ReactNode;
  className?: string;
}

function MonitoringGovernanceFooter ({ children, className }: Props) {
  return (
    <StyledFooter className={['monitoring-governance-footer', className].filter(Boolean).join(' ')}>
      {children}
    </StyledFooter>
  );
}

export default MonitoringGovernanceFooter;
