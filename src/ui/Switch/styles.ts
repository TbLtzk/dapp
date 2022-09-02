import styled, { css } from 'styled-components';

import { getSwitchColor } from './colors';

export const SwitchContainer = styled.div<{
  $checked: boolean;
  $disabled: boolean;
}>`
  position: relative;
  display: flex;
  gap: 16px;
  align-items: center;

  .switch-input {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;

    &:disabled {
      cursor: not-allowed;
    }
  }

  .switch-label {
    color: ${({ theme }) => getSwitchColor(theme, 'label')};
  }

  .switch-background {
    position: relative;
    height: 24px;
    width: 40px;
    border-radius: 36px;
    transition: all 150ms ease-out;
    background-color: ${({ theme, $checked }) => $checked
      ? getSwitchColor(theme, 'bgChecked')
      : getSwitchColor(theme, 'bg')
    };
    border: 2px solid ${({ theme, $checked }) => $checked
      ? 'transparent'
      : getSwitchColor(theme, 'border')
    };

    ${({ theme, $disabled, $checked }) => $disabled && css`
      background-color: ${$checked
        ? getSwitchColor(theme, 'bgDisabledChecked')
        : getSwitchColor(theme, 'bgDisabled')
      };
      border-color: ${$checked
        ? 'transparent'
        : getSwitchColor(theme, 'borderDisabled')
      };
    `}
  }

  ${({ theme, $checked, $disabled }) => !$disabled && css`
    .switch-input:focus-visible ~ .switch-background,
    &:hover .switch-background {
      background-color: ${$checked
        ? getSwitchColor(theme, 'bgCheckedHover')
        : getSwitchColor(theme, 'bgHover')
      };
    }
  `}

  .switch-input:focus-visible ~ .switch-background {
    border-color: ${({ theme, $checked }) => $checked
      ? getSwitchColor(theme, 'focusOutlineChecked')
      : getSwitchColor(theme, 'focusOutline')
    };
  }

  .switch-circle {
    position: absolute;
    border-radius: 50%;
    background-color: ${({ theme, $checked }) => $checked
      ? getSwitchColor(theme, 'circleChecked')
      : getSwitchColor(theme, 'circle')
    };

    ${({ $checked }) => $checked
      ? css`
        height: 16px;
        width: 16px;
        top: 2px;
        left: unset;
        right: 2px;
      `
      : css`
        height: 12px;
        width: 12px;
        top: 4px;
        left: 4px;
        right: unset;
      `
    }

    ${({ theme, $disabled, $checked }) => $disabled && !$checked && css`
      background-color: ${getSwitchColor(theme, 'circleDisabled')}
    `}
  }
`;
