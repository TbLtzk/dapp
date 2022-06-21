import styled, { css } from 'styled-components';

export const TooltipWrapper = styled.div`
  vertical-align: middle;
  display: inline-flex;
  align-self: center;

  .tooltip-trigger {
    display: flex;
    cursor: help;
  }

  .tooltip-content {
    position: absolute;
    opacity: 0;
    z-index: 9999;
    pointer-events: none;
    padding: 12px;
    background-color: ${(p) => p.$invertedColors
      ? p.theme.colors.oxfordBlue
      : p.theme.colors.oxfordBlueTint6
    };
    color: ${(p) => p.$invertedColors
      ? p.theme.colors.oxfordBlueTint6
      : p.theme.colors.oxfordBlueTint1
    };
    max-width: 280px;
    width: max-content;
    font-family: "OpenSans", sans-serif;
    font-size: 12px;
    line-height: 18px;
    border-radius: 5px;
    transition: none;

    .tooltip-arrow,
    .tooltip-arrow::before,
    .tooltip-arrow::after {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: inherit;
    }

    .tooltip-arrow {
      visibility: hidden;
    }

    .tooltip-arrow::before,
    .tooltip-arrow::after {
      visibility: visible;
      content: '';
    }

    .tooltip-arrow::before {
      transform: rotate(45deg);
    }

    .tooltip-arrow::after {
      background-color: transparent;
      width: 20px;
      height: 8px;
    }

    &[data-popper-placement^='top'] > .tooltip-arrow {
      bottom: -4px;
      
      &::before {
        border-radius: 0 0 3px 0;
      }

      &::after {
        transform: translate(-4px, 4px);
      }
    }

    &[data-popper-placement^='bottom'] > .tooltip-arrow {
      top: -4px;
      
      &::before {
        border-radius: 3px 0 0 0;
      }

      &::after {
        transform: translate(-4px, -2px);
      }
    }

    &[data-popper-placement^='left'] > .tooltip-arrow {
      right: -4px;

      &::before {
        border-radius: 0 3px 0 0;
      }

      &::after {
        transform: rotate(90deg);
      }
    }

    &[data-popper-placement^='right'] > .tooltip-arrow {
      left: -4px;

      &::before {
        border-radius: 0 0 0 3px;
      }

      &::after {
        transform: translateX(-8px) rotate(90deg);
      }
    }
  }

  ${({ $disabled }) => !$disabled && css`
    &:hover .tooltip-content {
      opacity: 1;
      pointer-events: all;
      overflow: visible;
      transition: opacity 200ms ease-out;

      &[data-popper-escaped],
      &[data-popper-reference-hidden] {
        opacity: 0;
        pointer-events: none;
      }
    }
  `}
`;
