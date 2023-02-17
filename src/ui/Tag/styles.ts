
import styled from 'styled-components';

import { TagState } from '.';

export const TagContainer = styled.p<{ $state: TagState }>`
  padding: 4px 12px;
  border-radius: 32px;
  display: grid;
  place-content: center;
  background-color: ${({ theme, $state }) => {
    switch ($state) {
      case 'rejected':
        return theme.colors.errorAdditional;
      case 'approved':
        return theme.colors.successMain;
      case 'pending':
        return theme.colors.warningSecondary;
    }
  }};
  color: ${({ theme }) => theme.colors.textNeutral};
`;
