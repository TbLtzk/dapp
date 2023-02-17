import { HTMLInputTypeAttribute } from 'react';

import styled, { css } from 'styled-components';

export const InputWrapper = styled.div<{
  $error?: string;
  $disabled: boolean;
  $type: HTMLInputTypeAttribute;
}>`
  width: 100%;

  .input-label-wrp {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  label {
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.textPrimary
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
      ? theme.colors.disablePrimary
      : 'transparent'
    };
    border: 1px solid ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.borderTertiary
    };
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.textPrimary
    };

    ${({ $disabled }) => !$disabled && css`
      &:hover {
        border-color: ${({ theme }) => theme.colors.borderAdditional};
      }
    
      &:focus-within{
        border-color: ${({ theme }) => theme.colors.primaryMain};
      }
    `}

    ${({ $error, $disabled }) => !$disabled && $error && css`
      &,
      &:focus-within,
      &:hover {
        border-color: ${({ theme }) => theme.colors.errorMain};
      }
    `}
  }

  .input-prefix {
    white-space: nowrap;
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
        ? theme.colors.disableSecondary
        : theme.colors.textTertiary
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
    white-space: nowrap;
  }

  .input-extra {
    margin-right: -4px;
    display: flex;
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.iconSecondary
    };
  }

  .input-error,
  .input-hint {
    margin-top: 4px;
  }

  .input-error {
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.errorMain
    };
  }

  .input-hint {
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.textPrimary
    };
  }
`;
