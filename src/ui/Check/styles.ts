import styled, { css } from 'styled-components';

import { getCheckColor } from './colors';

export const CheckContainer = styled.div<{
  $checked: boolean;
  $disabled: boolean;
}>`
  position: relative;
  display: flex;
  gap: 4px;
  align-items: center;

  .check-input {
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

  .check-frame {
    position: relative;
    border-radius: 2px;
    width: 16px;
    height: 16px;
    transition: all 150ms ease-out;
    border: 2px solid ${({ theme, $checked }) => $checked
      ? 'transparent'
      : getCheckColor(theme, 'frame')
    };
    background-color: ${({ theme, $checked }) => $checked
      ? getCheckColor(theme, 'frame')
      : 'transparent'
    };

    ${({ theme, $disabled, $checked }) => $disabled && css`
      background-color: ${$checked
        ? getCheckColor(theme, 'frameDisabled')
        : 'transparent'
      };
      border-color: ${$checked
        ? 'transparent'
        : getCheckColor(theme, 'frameDisabled')
      };
    `}
  }

  ${({ theme, $checked, $disabled }) => !$disabled && css`
    &:hover .check-frame {
      border-color: ${$checked
        ? 'transparent'
        : getCheckColor(theme, 'frameHover')
      };
      background-color: ${$checked
        ? getCheckColor(theme, 'frameHover')
        : 'transparent'
      };
    }
  `}

  .check-input:focus-visible ~ .check-frame {
    outline: 2px solid ${({ theme }) => getCheckColor(theme, 'focusOutline')};
  }

  .check-icon {
    position: absolute;
  }

  .check-path {
    stroke: ${({ theme, $disabled }) => $disabled
      ? getCheckColor(theme, 'iconDisabled')
      : getCheckColor(theme, 'icon')
    };
  }

  .check-label {
    color: ${({ theme, $disabled }) => $disabled
      ? getCheckColor(theme, 'labelDisabled')
      : getCheckColor(theme, 'label')
    };
  }
`;
