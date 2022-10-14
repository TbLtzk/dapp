import styled, { css } from 'styled-components';

export const StyledSpinner = styled.svg<{
  $size: number;
  $radius: number;
}>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  animation: rotate 2s linear infinite;
  
  & circle {
    stroke: currentColor;
    stroke-linecap: round;
    animation: spin-${({ $radius }) => $radius} 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }

  ${({ $radius }) => css`
    @keyframes spin-${$radius} {
      0% {
        stroke-dasharray: 1 ${2 * $radius * Math.PI};
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: ${2 * $radius * Math.PI} ${2 * $radius * Math.PI};
        stroke-dashoffset: -${0.5 * $radius * Math.PI};
      }
      100% {
        stroke-dasharray: ${2 * $radius * Math.PI} ${2 * $radius * Math.PI};
        stroke-dashoffset: -${2 * $radius * Math.PI};
      }
    }
  `}
`;
