import styled, { css } from 'styled-components';

export const RadioContainer = styled.div<{
  $checked: boolean;
  $disabled: boolean;
  $extended: boolean;
}>`
  position: relative;
  display: grid;
  grid-template: 'frame label';
  grid-template-columns: auto 1fr;
  gap: 4px;
  align-items: start;

  ${({ theme, $extended, $checked, $disabled }) => $extended && css`
    padding: 16px 24px;
    grid-template: 'frame label' 'frame tip';
    align-items: start;
    justify-content: start;
    align-content: start;
    column-gap: 12px;
    row-gap: 8px;
    border: 1px solid ${$checked
      ? theme.colors.primaryMain
      : theme.colors.secondaryMain
    };
    border-radius: 8px;
    transition: all 150ms ease-out;

    ${$disabled && css`
      border-color: ${theme.colors.disableSecondary};
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
    border: 2px solid ${({ theme, $checked }) => $checked
    ? theme.colors.primaryMiddle
    : theme.colors.secondaryMain};

    ${({ theme, $disabled }) => $disabled && css`
      border-color: ${theme.colors.disableSecondary};
    `}
  }

  ${({ theme, $disabled, $extended, $checked }) => !$disabled && css`
    &:hover .radio-frame,
    .radio-input:focus-visible ~ .radio-frame {
      border-color: ${$checked
        ? theme.colors.primaryMiddle
        : theme.colors.textAdditional
      };

      .radio-circle {
        background-color:  ${$checked
          ? theme.colors.primaryMiddle
          : theme.colors.textAdditional
        };
      }
    }

    ${$extended && css`
      &:hover {
        border-color:  ${$checked
          ? theme.colors.primaryMiddle
          : theme.colors.textAdditional
        };
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
    outline: 1px solid ${({ theme }) => theme.colors.primaryLight};
  }

  .radio-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: all 150ms ease-out;
    opacity: ${({ $checked }) => $checked ? 1 : 0};
    background-color: ${({ theme }) => theme.colors.primaryMain};

    ${({ theme, $disabled }) => $disabled && css`
      background-color: ${theme.colors.disableSecondary};
    `}
  }

  .radio-label {
    grid-area: label;
    display: flex;
    gap: 4px;
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.textPrimary
    };
  }

  .radio-tip {
    grid-area: tip;
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.textAdditional
    };
  }
`;
