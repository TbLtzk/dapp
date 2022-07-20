import styled from 'styled-components';

import { getBulbColor } from './colors';

export const StyledBulb = styled.svg`
  .bg {
    fill: ${({ theme }) => getBulbColor(theme, 'bg')};
  }

  .circle {
    fill: ${({ theme }) => getBulbColor(theme, 'circle')};
  }

  .gradient-a {
    stop-color: ${({ theme }) => getBulbColor(theme, 'gradientA')};
  }

  .gradient-b {
    stop-color: ${({ theme }) => getBulbColor(theme, 'gradientB')};
  }

  .inner-dark {
    fill: ${({ theme }) => getBulbColor(theme, 'innerDark')};
  }

  .inner-medium {
    fill: ${({ theme }) => getBulbColor(theme, 'innerMedium')};
  }

  .inner-stroke-medium {
    stroke: ${({ theme }) => getBulbColor(theme, 'innerMedium')};
  }

  .inner-stroke-light {
    stroke: ${({ theme }) => getBulbColor(theme, 'innerLight')};
  }
`;
