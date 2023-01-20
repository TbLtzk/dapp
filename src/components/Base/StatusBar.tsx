import { ReactNode } from 'react';

import styled from 'styled-components';

export type StatusType = 'success' | 'warning' | 'danger' | 'info';

interface Props {
  status: StatusType;
  children: ReactNode;
}

export const StatusBarWrapper = styled.span<{ status: StatusType }>`
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
    background-color: ${(props) => {
      switch (props.status) {
        case 'success':
          return props.theme.colors.success;
        case 'warning':
          return props.theme.colors.warning;
        case 'danger':
          return props.theme.colors.error;
        case 'info':
          return props.theme.colors.info;
      }
    }};
  }
`;

const StatusBar = ({ status, children }: Props) => {
  return (
    <StatusBarWrapper status={status}>
      {children}
    </StatusBarWrapper>
  );
};

export default StatusBar;
