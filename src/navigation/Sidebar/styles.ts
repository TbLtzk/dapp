import styled from 'styled-components';
import { media } from 'styles/media';

import { getSidebarColor } from './colors';

export const SidebarContainer = styled.div<{ $open: boolean }>`
  .sidebar {
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

    ${media.lessThan('medium')} {
      position: fixed;
      z-index: 9999;
      transform: translateX(${({ $open }) => ($open ? '0' : '-100%')}) scaleX(${({ $open }) => $open ? '1' : '0.8'});
      transform-origin: top left;
      transition: transform 200ms ease-out;
      padding: 16px 24px;
    }
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => getSidebarColor(theme, 'overlay')};
    z-index: 1;
    display: block;
    opacity: ${({ $open }) => $open ? '0.5' : '0'};
    pointer-events: ${({ $open }) => $open ? 'all' : 'none'};
    transition: opacity 200ms ease-out;

    ${media.greaterThan('medium')} {
      display: none
    }
  }

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
    flex-wrap: wrap;
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

    &:not(:last-child) {
      padding-right: 8px;
      border-right: 1px solid ${({ theme }) => theme.colors.blockBorder};
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
