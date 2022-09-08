import { HTMLAttributes } from 'react';

import { DonutOption, DonutTooltipPosition } from '../../types';

import { StyledDonutTooltip } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  option: DonutOption;
  position: DonutTooltipPosition;
  percent: string;
}

function DonutTooltip ({
  option,
  position,
  percent,
  ...rest
}: Props) {
  return (
    <StyledDonutTooltip className="donut-tooltip" {...rest}>
      {option.icon && (
        <div className="donut-tooltip-icon">
          {option.icon}
        </div>
      )}

      <div className="donut-tooltip-main">
        <p className="donut-tooltip-lbl text-md font-semibold ellipsis">
          {option.label}
        </p>
        <p className="donut-tooltip-val text-md font-light">
          {percent}
        </p>
      </div>

      <div className="donut-tooltip-arrow" data-placement={position} />
    </StyledDonutTooltip>
  );
};

export default DonutTooltip;
