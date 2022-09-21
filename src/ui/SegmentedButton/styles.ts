
import styled from 'styled-components';

import { getSegmentedButtonColor } from './colors';

export const SegmentedButtonContainer = styled.div<{ $light?: boolean }>`
  display: flex;
  border-radius: 32px;
  background-color: ${({ theme, $light }) => $light
    ? getSegmentedButtonColor(theme, 'bgLight')
    : getSegmentedButtonColor(theme, 'bg')
  };
  padding: 2px;
  
  .segmented-button-item {
    position: relative;
    cursor: pointer;
    padding: 8px 16px;
    border: none;
    outline: none;
    display: flex;
    height: max-content;
    background-color: transparent;
    color: ${({ theme }) => getSegmentedButtonColor(theme, 'text')};
    border-radius: 32px;
    transition: all 150ms ease-out;

    &.active {
      color: ${({ theme }) => getSegmentedButtonColor(theme, 'textActive')};
      font-weight: 600;
    }

    &:focus-visible {
      box-shadow: inset 0 0 0 2px ${({ theme }) => getSegmentedButtonColor(theme, 'focus')};
    }

    &.active:focus-visible > .segmented-button-item-active {
      box-shadow: inset 0 0 0 2px ${({ theme }) => getSegmentedButtonColor(theme, 'focusActive')};
    }
  }

  .segmented-button-item-lbl {
    z-index: 1;
  }

  .segmented-button-item-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 32px;
    transition: box-shadow 150ms ease-out;
    background-color: ${({ theme }) => getSegmentedButtonColor(theme, 'bgActive')};
  }
`;
