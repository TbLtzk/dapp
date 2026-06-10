import { ReactNode } from 'react';

import styled from 'styled-components';

const StyledFooter = styled.div`
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSecondary};
`;

interface Props {
  children: ReactNode;
}

function MonitoringGovernanceFooter ({ children }: Props) {
  return (
    <StyledFooter className="monitoring-governance-footer">
      {children}
    </StyledFooter>
  );
}

export default MonitoringGovernanceFooter;
