import styled from 'styled-components';

import { getRangeColor } from './colors';

export const RangeContainer = styled.div<{
  $disabled: boolean
  $percent: number
}>`
  position: relative;
  display: grid;
  gap: 4px;
  align-items: center;

  .range-label {
    color: ${({ theme, $disabled }) => $disabled
      ? getRangeColor(theme, 'labelDisabled')
      : getRangeColor(theme, 'label')
    };
  }

  .range-wrapper {
    display: grid;
    grid-template-columns: 1fr minmax(80px, 10%);
    gap: 12px;
  }

  .range-values {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .range-value {
    display: flex;
    gap: 4px;
    color: ${({ theme, $disabled }) => $disabled
      ? getRangeColor(theme, 'labelDisabled')
      : theme.colors.textPrimary
    };
  }

  .range-input {
    cursor: pointer;
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    background-color: ${({ theme, $disabled }) => $disabled
      ? getRangeColor(theme, 'trackDisabled')
      : getRangeColor(theme, 'track')
    };
    border-radius: 10px;
    background-image: linear-gradient(
      ${({ theme }) => getRangeColor(theme, 'thumbBorder')},
      ${({ theme }) => getRangeColor(theme, 'thumbBorder')}
    );
    background-size: ${({ $percent }) => $percent}% 100%;
    background-repeat: no-repeat;

    &:disabled {
      cursor: not-allowed;
      background-image: linear-gradient(
        ${({ theme }) => getRangeColor(theme, 'thumbBorderDisabled')},
        ${({ theme }) => getRangeColor(theme, 'thumbBorderDisabled')}
      );
    }

    &:focus-visible {
      outline: none;
    }

    &:focus-visible::-webkit-slider-runnable-track {
      outline: 2px solid ${({ theme }) => getRangeColor(theme, 'trackOutline')};
      border-radius: 2px;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: ${({ theme }) => getRangeColor(theme, 'thumbBg')};
      border: 4px solid ${({ theme, $disabled }) => $disabled
        ? getRangeColor(theme, 'thumbBorderDisabled')
        : getRangeColor(theme, 'thumbBorder')
      };
      border-radius: 50%;
    }

    &::-webkit-slider-runnable-track  {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background-color: transparent;
    }
  }

  .range-error {
    color: ${({ theme }) => getRangeColor(theme, 'error')};
  }
`;
