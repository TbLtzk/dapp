
import styled from 'styled-components';

export const SegmentedButtonContainer = styled.div<{ $light?: boolean }>`
  display: flex;
  border-radius: 32px;
  background-color: ${({ theme, $light }) => $light
    ? theme.colors.backgroundPrimary
    : theme.colors.backgroundSecondary};
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
    color: ${({ theme }) => theme.colors.textAdditional};
    border-radius: 32px;
    transition: all 150ms ease-out;

    &.active {
      color: ${({ theme }) => theme.colors.textNeutral};
      font-weight: 600;
    }

    &:focus-visible {
      box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.borderMain};
    }

    &.active:focus-visible > .segmented-button-item-active {
      box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
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
    background-color: ${({ theme }) => theme.colors.primaryMain};
  }
`;
