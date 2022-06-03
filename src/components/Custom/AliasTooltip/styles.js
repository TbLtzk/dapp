import styled from 'styled-components';

export const TooltipWrapper = styled.div`
  position: relative;
  padding: 1px 6px;
  vertical-align: middle;
  display: inline-flex;
  align-self: center;

  .alias-icon {
    cursor: help;
    display: grid;
    place-items: center;
    font-size: 10px;
    line-height: 1;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    color: ${(p) => p.theme.colors.oxfordBlueTint1};
    background-color: ${(p) => p.theme.palette === 'dark'
      ? p.theme.colors.neonGreen
      : p.theme.colors.white
    };
    font-weight: 600;
    transition: all 200ms ease;
  }

  .tooltip-content {
    position: absolute;
    top: 50%;
    left: calc(100% + 2px);
    opacity: 0;
    z-index: 1;
    pointer-events: none;
    padding: 15px;
    transform: translateY(-50%);
    background-color: ${(p) => p.theme.colors.oxfordBlueTint6};
    color: ${(p) => p.theme.colors.oxfordBlueTint1};
    max-width: 280px;
    width: max-content;
    font-family: "OpenSans", sans-serif;
    font-size: 12px;
    line-height: 18px;
    border-radius: 5px;
    transition: all 200ms ease-out;

    &::before {
      content: '';
      position: absolute;
      right: 100%;
      top: 50%;
      width: 10px;
      height: 10px;
      background-color: ${(p) => p.theme.colors.oxfordBlueTint6};
      border-radius: 0 0 0 3px;
      transform: translate(50%, -50%) rotate(45deg);
    }

    .tooltip-address {
      display: inline-flex;
      font-weight: 600;
    }
  }

  &:hover .tooltip-content {
    opacity: 1;
    pointer-events: all;
  }
`;
