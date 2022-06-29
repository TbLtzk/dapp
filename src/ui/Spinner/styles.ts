import styled from 'styled-components';

export const StyledSpinner = styled.svg<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  animation: rotate 2s linear infinite;
  
  & circle {
    stroke: currentColor;
    stroke-linecap: round;
    animation: spin 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }

  @keyframes spin {
    0% {
      stroke-dasharray: 1, ${({ $size }) => $size * 3};
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: ${({ $size }) => $size * 2}, ${({ $size }) => $size * 5};
      stroke-dashoffset: ${({ $size }) => $size * -0.5};
    }
    100% {
      stroke-dasharray: 90, ${({ $size }) => $size * 3};
      stroke-dashoffset: ${({ $size }) => $size * -2.5};
    }
  }
`;
