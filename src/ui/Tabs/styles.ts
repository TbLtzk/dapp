import styled from 'styled-components';

import { getTabColors } from './colors';

export const TabsContainer = styled.nav`
  position: relative;
  display: flex;
  min-width: max-content;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blockDivider};

  &::-webkit-scrollbar {
    display: none;
  }

  .tab {
    position: relative;
    padding: 8px 16px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    white-space: nowrap;
    cursor: pointer;

    h3 {
      color: ${({ theme }) => getTabColors(theme, 'inactive')};
    }

    &.active {
      h3 {
        color: ${({ theme }) => getTabColors(theme, 'active')};
        font-weight: 600;
      }
    }

    &:hover {
      cursor: pointer;
      text-decoration: none;
    }

    .tab-active {
      bottom: -1px;
      right: 0;
      position: absolute;
      width: 100%;
      height: 0.5px;
      background: ${({ theme }) => getTabColors(theme, 'dividerActive')};
    }
  }

  .tab-count {
    position: absolute;
    top: -2px;
    right: -2px;
    display: grid;
    place-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 600;
    background-color:  ${({ theme }) => getTabColors(theme, 'countBackground')};
    color: ${({ theme }) => getTabColors(theme, 'countNumber')};
  }
`;
