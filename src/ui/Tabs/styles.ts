import styled from 'styled-components';

import { getTabColor } from './colors';

export const TabsContainer = styled.nav`
  position: relative;
  display: flex;
  min-width: 100%;
  width: 100%;
  overflow-x: auto;
  padding: 8px;
  margin: -8px;

  &::after {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    bottom: 7px;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => getTabColor(theme, 'border')};
  }

  &::-webkit-scrollbar {
    display: none;
  }

  .tab {
    position: relative;
    padding: 8px 16px;
    white-space: nowrap;
    cursor: pointer;
    z-index: 1;

    .tab-label {
      color: ${({ theme }) => getTabColor(theme, 'inactive')};
    }

    &.active,
    &:hover {
      .tab-label {
        color: ${({ theme }) => getTabColor(theme, 'active')};
      }
    }

    .tab-active,
    .tab-label::after {
      content: '';
      bottom: -1px;
      right: 0;
      position: absolute;
      width: 100%;
      height: 1px;
    }

    .tab-active {
      background-color: ${({ theme }) => getTabColor(theme, 'borderActive')};
    }

    &:hover .tab-label::after {
      background-color: ${({ theme }) => getTabColor(theme, 'borderHover')};
    }

    &:focus-visible {
      outline: none;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1px;
        z-index: 1;
        box-shadow: 0 0 0 2px ${({ theme }) => getTabColor(theme, 'borderFocus')};
      }
    }
  }

  .tab-count {
    position: absolute;
    top: -8px;
    right: -8px;
    z-index: 2;
    display: grid;
    place-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 600;
    background-color:  ${({ theme }) => getTabColor(theme, 'countBackground')};
    color: ${({ theme }) => getTabColor(theme, 'countNumber')};
  }
`;
