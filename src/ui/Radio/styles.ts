import styled, { css } from 'styled-components';

import { getRadioColor } from './colors';

export const RadioContainer = styled.div<{
  $checked: boolean
  $disabled: boolean
}>`
  position: relative;
  display: flex;
  gap: 4px;
  align-items: center;

  .radio-input {
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

  .radio-frame {
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    padding: 2px;
    transition: all 150ms ease-out;
    border: 2px solid ${({ theme }) => getRadioColor(theme, 'frame')
    };

    ${({ theme, $disabled }) => $disabled && css`
      border-color: ${getRadioColor(theme, 'frameDisabled')};
    `}
  }

  ${({ theme, $disabled }) => !$disabled && css`
    &:hover .radio-frame,
    .radio-input:focus-visible ~ .radio-frame {
      border-color: ${getRadioColor(theme, 'frameHover')};

      .radio-circle {
        background-color: ${getRadioColor(theme, 'frameHover')};
      }
    }
  `}

  .radio-input:focus-visible ~ .radio-frame::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    border-radius: 50%;
    outline: 1px solid ${({ theme }) => getRadioColor(theme, 'focusOutline')};
  }

  .radio-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: all 150ms ease-out;
    opacity: ${({ $checked }) => $checked ? 1 : 0};
    background-color: ${({ theme }) => getRadioColor(theme, 'frame')};

    ${({ theme, $disabled }) => $disabled && css`
      background-color: ${getRadioColor(theme, 'frameDisabled')};
    `}
  }

  .radio-label {
    color: ${({ theme, $disabled }) => $disabled
      ? getRadioColor(theme, 'labelDisabled')
      : getRadioColor(theme, 'label')
    };
  }
`;
