import { ReactNode } from 'react';

import styled from 'styled-components';
import { ValidatorStatus } from 'typings/validator';

interface Props {
  status: ValidatorStatus;
  children: ReactNode;
}

const ValidatorStatusBarWrapper = styled.span<{ status: ValidatorStatus }>`
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    display: inline-block;
    content: '';
    border-radius: 50%;
    height: 8px;
    width: 8px;
    margin-right: 4px;
    background-color: ${({ theme, status }) => {
    switch (status) {
      case 'active':
        return theme.colors.primaryDark;
      case 'standby':
        return theme.colors.warningSecondary;
      case 'backup':
        return theme.colors.infoSecondary;
      case 'inactive':
        return theme.colors.errorMain;
      case 'not-ranking':
        return theme.colors.borderMain;
    }
  }};
  }
`;

const ValidatorStatusBar = ({ status, children }: Props) => {
  return (
    <ValidatorStatusBarWrapper status={status}>
      {children}
    </ValidatorStatusBarWrapper>
  );
};

export default ValidatorStatusBar;
