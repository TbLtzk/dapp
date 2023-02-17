import styled, { css } from 'styled-components';

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
      : theme.colors.iconPrimary
    };
    background-color: ${({ theme, $checked }) => $checked
      ? theme.colors.primaryMain
      : 'transparent'
    };

    ${({ theme, $disabled, $checked }) => $disabled && css`
      background-color: ${$checked
        ? theme.colors.disableSecondary
        : 'transparent'
      };
      border-color: ${$checked
        ? 'transparent'
        : theme.colors.disableSecondary
      };
    `}
  }

  ${({ theme, $checked, $disabled }) => !$disabled && css`
    &:hover .check-frame {
      border-color: ${$checked
        ? 'transparent'
        : theme.colors.iconAdditional
      };
      background-color: ${$checked
        ? theme.colors.primaryMiddle
        : 'transparent'
      };
    }
  `}

  .check-input:focus-visible ~ .check-frame {
    outline: 2px solid ${({ theme }) => theme.colors.primaryLight};
  }

  .check-icon {
    position: absolute;
  }

  .check-path {
    stroke: ${({ theme }) => theme.colors.backgroundPrimary};
  }

  .check-label {
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.textPrimary
    };
  }
`;
