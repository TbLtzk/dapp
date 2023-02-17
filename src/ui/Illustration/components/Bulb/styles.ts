import styled from 'styled-components';

export const StyledBulb = styled.svg`
  .bg {
    fill: ${({ theme }) => theme.colors.bulbBackground};
  }

  .circle {
    fill: ${({ theme }) => theme.colors.bulbBackground};
  }

  .gradient-a {
    stop-color: ${({ theme }) => theme.colors.bulbGradientA};
  }

  .gradient-b {
    stop-color: ${({ theme }) => theme.colors.bulbGradientB};
  }

  .inner-dark {
    fill: ${({ theme }) => theme.colors.bulbInnerDark};
  }

  .inner-medium {
    fill: ${({ theme }) => theme.colors.bulbInnerMedium};
  }

  .inner-stroke-medium {
    stroke: ${({ theme }) => theme.colors.bulbInnerMedium};
  }

  .inner-stroke-light {
    stroke: ${({ theme }) => theme.colors.bulbInnerLight};
  }
`;
