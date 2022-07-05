import { HTMLAttributes } from 'react';

import { ProgressContainer } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: number
  max: number
}

function Progress ({
  value,
  max,
  ...rest
}: Props) {
  const percent = max === 0 && value > 0
    ? 100
    : Math.round((value / max) * 100);

  return (
    <ProgressContainer $percent={percent} {...rest} />
  );
};

export default Progress;
