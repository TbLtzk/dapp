import styled from 'styled-components';
import { media } from 'styles/media';

import { getSidebarColor } from './colors';

export const SidebarContainer = styled.div`
  position: relative;
  width: 302px;
  height: 100vh;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto; 
  align-content: space-between;
  gap: 24px;
  padding: 16px 32px;
  background-color: ${({ theme }) => theme.colors.block};
  border-right: 1px solid ${({ theme }) => theme.colors.blockBorder};

  .sidebar-content {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    align-content: start;
    gap: 16px;
  }

  .sidebar-logo-link {
    display: flex;
    width: max-content;
  }

  .sidebar-logo {
    width: 40px;
    height: 40px;
    filter: ${({ theme }) => theme.palette === 'dark' ? 'brightness(100)' : 'none'};
  }

  .sidebar-main {
    display: grid;
    gap: 16px;
    align-content: start;
  }

  .sidebar-links {
    display: grid;
    gap: 4px;
    place-content: start;
    overflow-y: auto;
    overflow-x: hidden;
    // HACK: Display scrollbar inside the container
    margin: 0 -16px;
    padding: 0 16px;
  }

  .sidebar-footer {
    display: flex;
    gap: 8px;
    justify-content: center;
  }

  .sidebar-footer-link {
    color: ${({ theme }) => getSidebarColor(theme, 'linkText')};
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;

    &:hover,
    &:focus-visible {
      color: ${({ theme }) => getSidebarColor(theme, 'linkTextActive')};
    }

    &:not(:first-child) {
      padding-left: 8px;
      border-left: 1px solid ${({ theme }) => theme.colors.blockBorder};
    }
  }

  // TODO: Remove when aliasing link is removed from sidebar
  ${media.lessThan('huge')} {
    gap: 16px;

    .sidebar-main {
      gap: 8px;
    }
  }
`;
