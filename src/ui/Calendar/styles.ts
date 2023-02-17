import styled, { css } from 'styled-components';

export const CalendarWrapper = styled.div<{
  $error?: string;
  $disabled: boolean;
}>`
  width: 100%;

  .calendar-lbl {
    margin-bottom: 8px;
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.textPrimary
    };
  }

  .calendar-error {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.errorMain};
  }

  // React DatePicker override
  .react-datepicker-wrapper {
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

      &:focus-within {
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

  input {
    padding: 0;
    border: none;
    text-align: left;
    width: 100%;
    background-color: inherit;
    color: inherit;
    outline: none;
    font-size: 14px;
    height: 20px;

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

  .react-datepicker__input-container {
    display: flex;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker {
    font-family: inherit;
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
    border: 1px solid ${({ theme }) => theme.colors.borderPrimary};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .react-datepicker__navigation--next {
    border-left-color: ${({ theme }) => theme.colors.iconAdditional};

    &:hover {
      border-left-color: ${({ theme }) => theme.colors.iconPrimary};
    }
  }

  .react-datepicker__navigation--previous {
    border-right-color: ${({ theme }) => theme.colors.iconAdditional};

    &:hover {
      border-right-color: ${({ theme }) => theme.colors.iconPrimary};
    }
  }

  .react-datepicker__header {
    background-color: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderPrimary};
  }

  .react-datepicker__current-month {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .react-datepicker__day {
    color: ${({ theme }) => theme.colors.textPrimary};

    &--disabled {
      color: ${({ theme }) => theme.colors.disableSecondary};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.tertiaryLight} !important;
    }

    &--in-range,
    &--in-selecting-range,
    &--in-range:hover {
      background-color: ${({ theme }) => theme.colors.tertiaryMain} !important;
    }

    &--selected,
    &--selected:hover {
      background-color: ${({ theme }) => theme.colors.primaryMain} !important;
      color: ${({ theme }) => theme.colors.textPrimary} !important;
      font-weight: 600;
    }

    &--keyboard-selected {
      background-color: ${({ theme }) => theme.colors.tertiaryMain} !important;
    }

    &--disabled:hover {
      background-color: transparent !important;
    }
  }

  .react-datepicker__time-container {
    border-left: 1px solid ${({ theme }) => theme.colors.borderPrimary};

    .react-datepicker__time {
      background-color: ${({ theme }) => theme.colors.backgroundPrimary};
    }

    .react-datepicker-time__header {
      color: ${({ theme }) => theme.colors.textPrimary};
    }

    .react-datepicker__time-list-item {
      color: ${({ theme }) => theme.colors.textPrimary};

      &--disabled {
        color: ${({ theme }) => theme.colors.disableSecondary} !important;
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.tertiaryLight} !important;
      }

      &--selected,
      &--selected:hover {
        background-color: ${({ theme }) => theme.colors.primaryMain} !important;
        color: ${({ theme }) => theme.colors.textPrimary} !important;
        font-weight: 600;
      }

      &--disabled:hover {
        background-color: transparent !important;
      }
    }
  }
`;
