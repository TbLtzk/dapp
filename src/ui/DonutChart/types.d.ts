import { CSSProperties, ReactNode } from 'react';

export { default } from './DonutChart';

export type DonutOption = {
  label: string;
  value: number;
  icon?: ReactNode;
}

export type DonutLegendItem = {
  color: string;
  label: string;
  value: string;
  percent: string;
  icon?: ReactNode;
}

export type DonutTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type DonutTooltipOptions = {
  index: number;
  position: DonutTooltipPosition;
  style: CSSProperties;
}
