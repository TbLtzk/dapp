
import styled from 'styled-components';

import { getProgressColor } from './colors';

export const ProgressContainer = styled.div<{
  $percent: number
}>`
  position: relative;
  display: flex;
  background-color: ${({ theme }) => getProgressColor(theme, 'bgTrack')};
  height: 8px;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ $percent }) => `${$percent}%`};
    height: 100%;
    border-radius: 8px;
    background-color: ${({ theme }) => getProgressColor(theme, 'bgProgress')};
    transition: width 150ms ease-out;
  }
`;
