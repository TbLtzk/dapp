import styled, { css } from 'styled-components'

export const ChildrenWrapper = styled.div`
  position: relative;
  span {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

function getTooltipPosition (positon) {
  switch (positon) {
    case 'right': {
      return css`
        top: -5px;
        left: 105%;
      `
    }
    case 'left': {
      return css`
        top: -2px;
        right: 101%;
        white-space: nowrap;
        &:after {
          display: none;
        }
      `
    }

    case 'bottom': {
      return css`
        width: max-content;
        top: 10%;
        left: 50%;
        transform: translate(-50%, 0);
        &:after {
          display: none;
        }
      `
    }
    case 'top':
    default: {
      return css`
        width: max-content;
        bottom: 110%;
        left: 50%;
        transform: translate(-50%, 0);
      `
    }
  }
}

export const TooltipContainer = styled.div`
  position: relative;
  display: block;
  width: available;

  .tooltip {
    visibility: hidden;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;

    background-color: ${(p) => p.theme.colors.neonGreen};
    color: #000000;
    font-size: 13px;
    max-width: 200px;
    min-width: 80px;

    min-height: 40px;
    border-radius: 3px;

    opacity: 0;
    transition: opacity 0.3s;
    line-height: 20px;

    z-index: 1;
    padding: 5px;

    ${(p) => getTooltipPosition(p.position)}
    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-width: 10px;
      border-style: solid;
      border-color: ${(p) => p.theme.colors.neonGreen} transparent transparent transparent;
      bottom: -15px;
      left: calc(50% - 10px);
    }
  }

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`
