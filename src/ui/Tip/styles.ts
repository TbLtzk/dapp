import styled from 'styled-components';

import { getTipColor } from './colors';
import { TipType } from '.';

export const TipWrapper = styled.div<{
  $type: TipType
  $compact?: boolean
}>`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: ${({ $compact }) => $compact ? '8px' : '16px'};
  padding: ${({ $compact }) => $compact ? '12px 16px' : '16px'};
  border-radius: 8px;
  background-color: ${({ theme, $type }) => getTipColor(theme, `${$type}Bg`)};
  
  .tip-icon {
    color: ${({ theme, $type }) => getTipColor(theme, `${$type}Icon`)};
    align-self: start;
  }

  .tip-text {
    color: ${({ theme }) => getTipColor(theme, 'text')};
    align-self: start;
  }
`;
