import styled from 'styled-components';

export const LegendContainer = styled.div`
  display: grid;
  gap: 16px;

  .donut-legend-item {
    display: grid;
    gap: 12px;
    grid-template-columns: auto minmax(0, 1fr) 0.5fr 1fr;
  }

  .donut-legend-lbl {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .donut-legend-icon {
    transform: scale(0.8);
    width: 20px;
  }

  .donut-legend-color {
    display: flex;
    width: 8px;
    height: 20px;
    border-radius: 8px;
  }

  .donut-legend-val {
    text-align: right;
  }
`;
