import styled, { css } from 'styled-components';

export const TooltipWrapper = styled.span`
  position: relative;
  padding: 0 8px;
  vertical-align: middle;
  display: inline-flex;

  i {
    cursor: help;
    font-size: 16px;
    color: ${(p) => p.theme.palette === 'dark'
      ? p.theme.colors.oxfordBlueTint3
      : p.theme.colors.oxfordBlueTint2
    };
    transition: all 200ms ease;
  }

  &:hover i {
    color: ${(p) => p.theme.colors.white};
  }

  span {
    position: absolute;
    left: 50%;
    bottom: 35px;
    opacity: 0;
    pointer-events: none;
    padding: 15px;
    transform: translateX(-50%);
    background-color: ${(p) => p.theme.colors.oxfordBlue};
    border: 1px solid ${(p) => p.theme.colors.oxfordBlueTint3};
    max-width: 280px;
    width: max-content;
    font-family: "OpenSans", sans-serif;
    font-size: 12px;
    line-height: 18px;
    border-radius: 5px;
    transition: all 200ms ease-out;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
    }

    &::before {
      width: 10px;
      height: 10px;
      background-color: ${(p) => p.theme.colors.oxfordBlue};
      border: 1px solid ${(p) => p.theme.colors.oxfordBlueTint3};
      border-radius: 0 0 3px 0;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      width: 15px;
      height: 10px;
      background-color: ${(p) => p.theme.colors.oxfordBlue};
      transform: translate(-50%, -100%);
    }

    ${(p) => p.$bottom && css`
      top: 40px;
      bottom: unset;

      &::before,
      &::after {
        top: unset;
        bottom: 100%;
      }

      &::before {
        transform: translate(-50%, 50%) rotate(225deg);
      }

      &::after {
        transform: translate(-50%, 100%);
      }
    `}
  }

  &:hover span {
    opacity: 1;
    pointer-events: all;
  }
`;
