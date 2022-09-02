import { HTMLAttributes } from 'react';

import { ProgressContainer } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  trackColor?: string;
  valueColor?: string;
}

function Progress ({
  value,
  max,
  trackColor,
  valueColor,
  ...rest
}: Props) {
  const percent = max === 0 && value > 0
    ? 100
    : Math.round((value / max) * 100);

  return (
    <ProgressContainer
      $percent={percent}
      $trackColor={trackColor}
      $valueColor={valueColor}
      {...rest}
    />
  );
};

export default Progress;
