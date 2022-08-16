import styled from 'styled-components';
import { media } from 'styles/media';

export const DonutChartContainer = styled.div<{}>`
  display: grid;
  gap: 48px;

  .donut-chart-wrp {
    width: 60%;
    position: relative;
    margin: 0 auto;

    ${media.lessThan('tablet')} {
      width: 80%;
    }
  }

  .donut-chart {
    position: relative;
    z-index: 1;
  }

  .donut-total {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
    text-align: center;
    z-index: 0;
  }
`;
