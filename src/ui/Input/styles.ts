import { HTMLInputTypeAttribute } from 'react';

import styled, { css } from 'styled-components';

import { getInputColor } from './colors';

export const InputWrapper = styled.div<{
  $error?: string,
  $disabled: boolean,
  $type: HTMLInputTypeAttribute
}>`
  width: 100%;

  label {
    margin-bottom: 8px;
    color: ${({ theme, $disabled }) => $disabled
      ? getInputColor(theme, 'labelDisabled')
      : getInputColor(theme, 'label')
    };
  }

  .input-container {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    transition: all 100ms ease-out;
    cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'initial'};
    background-color: ${({ theme, $disabled }) => $disabled
      ? getInputColor(theme, 'containerBgDisabled')
      : getInputColor(theme, 'containerBg')
    };
    border: 1px solid ${({ theme, $disabled }) => $disabled
      ? getInputColor(theme, 'containerBorderDisabled')
      : getInputColor(theme, 'containerBorder')
    };
    color: ${({ theme, $disabled }) => $disabled
      ? getInputColor(theme, 'containerTextDisabled')
      : getInputColor(theme, 'containerText')
    };

    ${({ $disabled }) => !$disabled && css`
      &:focus-within,
      &:hover {
        border-color: ${({ theme }) => getInputColor(theme, 'containerBorderHover')};
      }
    `}

    ${({ $error, $disabled }) => !$disabled && $error && css`
      &,
      &:focus-within,
      &:hover {
        border-color: ${({ theme }) => getInputColor(theme, 'containerBorderError')};
      }
    `}
  }

  input {
    padding: 0;
    border: none;
    text-align: left;
    width: 100%;
    background-color: inherit;
    color: inherit;
    outline: none;

    &::placeholder {
      color: ${({ theme, $disabled }) => $disabled
        ? getInputColor(theme, 'placeholderDisabled')
        : getInputColor(theme, 'placeholder')
      };
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .input-max {
    margin: -4px -8px -4px 0;
    padding: 0 8px;
    height: 28px;
  }

  .input-extra {
    margin-right: -4px;
    display: flex;
    color: inherit;
  }

  .input-error,
  .input-hint {
    margin-top: 4px;
  }

  .input-error {
    color: ${({ theme }) => getInputColor(theme, 'error')};
  }

  .input-hint {
    color: ${({ theme, $disabled }) => $disabled
      ? getInputColor(theme, 'hintDisabled')
      : getInputColor(theme, 'hint')
    };
  }
`;
