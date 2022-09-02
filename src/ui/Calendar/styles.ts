import styled, { css } from 'styled-components';

import { getCalendarColor } from './colors';

export const CalendarWrapper = styled.div<{
  $error?: string;
  $disabled: boolean;
}>`
  width: 100%;

  .calendar-lbl {
    margin-bottom: 8px;
    color: ${({ theme, $disabled }) => $disabled
      ? getCalendarColor(theme, 'labelDisabled')
      : getCalendarColor(theme, 'label')
    };
  }

  .calendar-error {
    margin-top: 4px;
    color: ${({ theme }) => getCalendarColor(theme, 'error')};
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
      ? getCalendarColor(theme, 'containerBgDisabled')
      : getCalendarColor(theme, 'containerBg')
    };
    border: 1px solid ${({ theme, $disabled }) => $disabled
      ? getCalendarColor(theme, 'containerBorderDisabled')
      : getCalendarColor(theme, 'containerBorder')
    };
    color: ${({ theme, $disabled }) => $disabled
      ? getCalendarColor(theme, 'containerTextDisabled')
      : getCalendarColor(theme, 'containerText')
    };

    ${({ $disabled }) => !$disabled && css`
      &:focus-within,
      &:hover {
        border-color: ${({ theme }) => getCalendarColor(theme, 'containerBorderHover')};
      }
    `}

    ${({ $error, $disabled }) => !$disabled && $error && css`
      &,
      &:focus-within,
      &:hover {
        border-color: ${({ theme }) => getCalendarColor(theme, 'containerBorderError')};
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
        ? getCalendarColor(theme, 'placeholderDisabled')
        : getCalendarColor(theme, 'placeholder')
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
    background-color: ${({ theme }) => theme.colors.block};
    border: 1px solid ${({ theme }) => theme.colors.blockBorder};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .react-datepicker__navigation--next {
    border-left-color: ${({ theme }) => theme.colors.blockBorderAccent};

    &:hover {
      border-left-color: ${({ theme }) => theme.colors.blockBorderHover};
    }
  }

  .react-datepicker__navigation--previous {
    border-right-color: ${({ theme }) => theme.colors.blockBorderAccent};

    &:hover {
      border-right-color: ${({ theme }) => theme.colors.blockBorderHover};
    }
  }

  .react-datepicker__header {
    background-color: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blockBorder};
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
      color: ${({ theme }) => theme.colors.textDisabled};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.blockHover} !important;
    }

    &--in-range,
    &--in-selecting-range,
    &--in-range:hover {
      background-color: ${({ theme }) => getCalendarColor(theme, 'rangeBg')} !important;
    }

    &--selected,
    &--selected:hover {
      background-color: ${({ theme }) => getCalendarColor(theme, 'selectedBg')} !important;
      color: ${({ theme }) => getCalendarColor(theme, 'selectedText')} !important;
      font-weight: 600;
    }

    &--keyboard-selected {
      background-color: ${({ theme }) => getCalendarColor(theme, 'rangeBg')} !important;
    }

    &--disabled:hover {
      background-color: transparent !important;
    }
  }

  .react-datepicker__time-container {
    border-left: 1px solid ${({ theme }) => theme.colors.blockBorder};

    .react-datepicker__time {
      background-color: ${({ theme }) => theme.colors.block};
    }

    .react-datepicker-time__header {
      color: ${({ theme }) => theme.colors.textPrimary};
    }

    .react-datepicker__time-list-item {
      color: ${({ theme }) => theme.colors.textPrimary};

      &--disabled {
        color: ${({ theme }) => theme.colors.textDisabled} !important;
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.blockHover} !important;
      }

      &--selected,
      &--selected:hover {
        background-color: ${({ theme }) => getCalendarColor(theme, 'selectedBg')} !important;
        color: ${({ theme }) => getCalendarColor(theme, 'selectedText')} !important;
        font-weight: 600;
      }

      &--disabled:hover {
        background-color: transparent !important;
      }
    }
  }
`;
