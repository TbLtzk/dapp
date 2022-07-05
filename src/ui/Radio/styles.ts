import styled, { css } from 'styled-components';

import { getRadioColor } from './colors';

export const RadioContainer = styled.div<{
  $checked: boolean
  $disabled: boolean
  $extended: boolean
}>`
  position: relative;
  display: grid;
  grid-template: 'frame label';
  grid-template-columns: auto 1fr;
  gap: 4px;
  align-items: center;

  ${({ theme, $extended, $checked, $disabled }) => $extended && css`
    padding: 16px 24px;
    grid-template: 'frame label' 'frame tip';
    align-items: start;
    justify-content: start;
    align-content: start;
    column-gap: 12px;
    row-gap: 8px;
    border: 1px solid ${$checked
      ? getRadioColor(theme, 'borderActive')
      : getRadioColor(theme, 'border')
    };
    border-radius: 8px;
    transition: all 150ms ease-out;

    ${$disabled && css`
      border-color: ${getRadioColor(theme, 'frameDisabled')};
    `};
  `};

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
    grid-area: frame;
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin: ${({ $extended }) => $extended ? '4px 2px' : '2px'};
    padding: 2px;
    transition: all 150ms ease-out;
    border: 2px solid ${({ theme }) => getRadioColor(theme, 'frame')
    };

    ${({ theme, $disabled }) => $disabled && css`
      border-color: ${getRadioColor(theme, 'frameDisabled')};
    `}
  }

  ${({ theme, $disabled, $extended }) => !$disabled && css`
    &:hover .radio-frame,
    .radio-input:focus-visible ~ .radio-frame {
      border-color: ${getRadioColor(theme, 'frameHover')};

      .radio-circle {
        background-color: ${getRadioColor(theme, 'frameHover')};
      }
    }

    ${$extended && css`
      &:hover {
        border-color: ${getRadioColor(theme, 'frameHover')};
      }
    `}
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
    grid-area: label;
    display: flex;
    gap: 4px;
    color: ${({ theme, $disabled }) => $disabled
      ? getRadioColor(theme, 'labelDisabled')
      : getRadioColor(theme, 'label')
    };
  }

  .radio-tip {
    grid-area: tip;
    color: ${({ theme, $disabled }) => $disabled
      ? getRadioColor(theme, 'labelDisabled')
      : getRadioColor(theme, 'tip')
    };
  }
`;
