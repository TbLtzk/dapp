import styled from 'styled-components';

import { getSelectColor } from './colors';

export const SelectContainer = styled.div<{
  $open: boolean
  $disabled?: boolean
}>`
  .select-arrow {
    display: flex;
    padding: 0;
    border-radius: 4px;
    cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
    outline: none;
    border: none;
    background-color: transparent;
    color: ${({ theme, $disabled }) => $disabled
      ? getSelectColor(theme, 'iconDisabled')
      : getSelectColor(theme, 'icon')
    };

    &:focus-visible {
      box-shadow: inset 0 0 0 2px ${({ theme }) => getSelectColor(theme, 'optionFocusBorder')};
    }
  }

  .select-chips {
    border-radius: 8px;
  }

  .select-icon {
    transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'none'};
    transition: transform 150ms ease-out;
  }

  .select-options {
    background: ${({ theme }) => theme.colors.block};
    box-shadow:
      0 4px 4px ${({ theme }) => theme.colors.blockShadowDark},
      0 -1px 2px ${({ theme }) => theme.colors.blockShadowLight};
    border: 1px solid ${({ theme }) => getSelectColor(theme, 'border')};
    border-radius: 8px;
    padding: 4px 0;
    display: grid;
    overflow-y: auto;
    max-height: 264px;
  }

  .select-option {
    padding: 8px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    text-align: left;
    display: flex;
    align-items: center;
    outline: none;
    gap: 8px;

    &:hover {
      background-color: ${({ theme }) => getSelectColor(theme, 'optionBgHover')};
    }

    &:focus-visible {
      box-shadow: inset 0 0 0 2px ${({ theme }) => getSelectColor(theme, 'optionFocusBorder')};
    }

    &.active {
      background-color: ${({ theme }) => getSelectColor(theme, 'optionBgSelected')};
    }
  }

  .select-option-icon {
    opacity: 0;

    &.active {
      opacity: 1;
    }
  }

  .select-stub {
    padding: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .select-error {
    margin-top: 4px;
    color: ${({ theme }) => getSelectColor(theme, 'error')};
  }
`;
