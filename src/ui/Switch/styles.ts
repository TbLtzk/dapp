import styled, { css } from 'styled-components';

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
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .switch-background {
    position: relative;
    height: 24px;
    width: 40px;
    border-radius: 36px;
    transition: all 150ms ease-out;
    background-color: ${({ theme, $checked }) => $checked
      ? theme.colors.primaryMain
      : theme.colors.backgroundPrimary
    };
    border: 2px solid ${({ theme, $checked }) => $checked
      ? 'transparent'
      : theme.colors.secondaryMain
    };

    ${({ theme, $disabled, $checked }) => $disabled && css`
      background-color: ${$checked
        ? theme.colors.disableSecondary
        : theme.colors.disablePrimary
      };
      border-color: ${$checked
        ? 'transparent'
        : theme.colors.disablePrimary
      };
    `}
  }

  ${({ theme, $checked, $disabled }) => !$disabled && css`
    .switch-input:focus-visible ~ .switch-background,
    &:hover .switch-background {
      background-color: ${$checked
        ? theme.colors.primaryMiddle
        : theme.colors.tertiaryMain
      };
    }
  `}

  .switch-input:focus-visible ~ .switch-background {
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }

  .switch-circle {
    position: absolute;
    border-radius: 50%;
    background-color: ${({ theme, $checked }) => $checked
      ? theme.colors.naturalAdditional
      : theme.colors.secondaryMain
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

    ${({ $disabled, $checked }) => $disabled &&
      css`
        background-color: ${({ theme, }) => $checked
          ? theme.colors.disablePrimary
          : theme.colors.disableSecondary
      };`
    }
  }
`;
