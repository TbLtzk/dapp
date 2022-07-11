import styled from 'styled-components';
import { media } from 'styles/media';

import { getSidebarColor } from 'navigation/Sidebar/colors';

export const ReferencesContainer = styled.div`
  display: grid;
  border-top: 1px solid ${({ theme }) => theme.colors.blockBorder};
  padding-top: 16px;

  // TODO: Remove when aliasing link is removed from sidebar
  ${media.lessThan('huge')} {
    padding-top: 8px;
  }

  .reference-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    color: ${({ theme }) => getSidebarColor(theme, 'linkText')};
    outline: none;

    &:hover,
    &:focus-visible {
      text-decoration: none;
      color: ${({ theme }) => getSidebarColor(theme, 'linkTextActive')};
    }

    &:hover .reference-link-text {
      text-decoration: underline;
    }
  }

  .reference-link-icon {
    font-size: 12px;
  }
`;
