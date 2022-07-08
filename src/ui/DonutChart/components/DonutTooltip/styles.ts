import styled from 'styled-components';
import { getDonutChartColor } from 'ui/DonutChart/colors';

export const StyledDonutTooltip = styled.div`
  pointer-events: none;
  position: absolute;
  display: flex;
  z-index: 2;
  gap: 8px;
  background-color: ${({ theme }) => getDonutChartColor(theme, 'tooltipBg')};
  border-radius: 8px;
  padding: 12px;
  opacity: 0;
  transition: opacity 250ms ease-out;

  .donut-tooltip-icon {
    width: 20px;
  }

  .donut-tooltip-lbl,
  .donut-tooltip-val {
    max-width: 120px;
    color: ${({ theme }) => getDonutChartColor(theme, 'tooltipText')};
  }

  .donut-tooltip-arrow,
  .donut-tooltip-arrow::before,
  .donut-tooltip-arrow::after {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: inherit;
  }

  .donut-tooltip-arrow {
    visibility: hidden;
    transform: translate(-50%, -50%);

    &[data-placement^='top'] {
      top: 0;
      left: 50%;
      
      &::before {
        border-radius: 2px 0 0 0;
      }
    }

    &[data-placement='bottom'] {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      
      &::before {
        border-radius: 0 0 2px 0;
      }
    }

    &[data-placement^='left'] {
      top: 50%;
      left: 0;
      
      &::before {
        border-radius: 0 0 0 2px;
      }
    }

    &[data-placement^='right'] {
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      
      &::before {
        border-radius: 0 2px 0 0;
      }
    }
  }

  .donut-tooltip-arrow::before,
  .donut-tooltip-arrow::after {
    visibility: visible;
    content: '';
  }

  .donut-tooltip-arrow::before {
    transform: rotate(45deg);
  }

  .donut-tooltip-arrow::after {
    background-color: transparent;
    width: 20px;
    height: 8px;
  }
`;
