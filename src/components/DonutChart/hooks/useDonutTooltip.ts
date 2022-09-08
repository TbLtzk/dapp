import { useState } from 'react';

import { ArcProps, Chart, TooltipModel } from 'chart.js';
import { isEqual } from 'lodash';

import { DonutTooltipOptions, DonutTooltipPosition } from '../types';

function useDonutTooltip () {
  const [tooltipOpts, setTooltipOpts] = useState<DonutTooltipOptions>({
    index: 0,
    position: 'top',
    style: {}
  });

  const updateTooltip = ({ chart, tooltip }: { chart: Chart; tooltip: TooltipModel<'doughnut'>}) => {
    const [left, top] = _getArcCenter(tooltip);
    const position = _getPosition({ chart, tooltip });
    const { offsetX, offsetY, transform } = _getPositionModifiers(position);

    const opts: DonutTooltipOptions = {
      index: tooltip.dataPoints[0].dataIndex,
      position,
      style: {
        top: top + offsetY,
        left: left + offsetX,
        opacity: tooltip.opacity,
        transitionProperty: tooltip.opacity && tooltipOpts.style.opacity
          ? 'top, left, opacity'
          : '',
        transform
      }
    };
    setTooltipOpts((prev) => isEqual(prev, opts) ? prev : opts);
  };

  const _getArcCenter = (tooltip: TooltipModel<'doughnut'>) => {
    const element = tooltip.dataPoints[0].element as unknown as ArcProps;
    const angleDelta = element.startAngle + (element.endAngle - element.startAngle) / 2;

    return [
      element.x + element.innerRadius * Math.cos(angleDelta),
      element.x + element.innerRadius * Math.sin(angleDelta)
    ];
  };

  const _getPosition = ({ chart, tooltip }: {
    chart: Chart;
    tooltip: TooltipModel<'doughnut'>;
  }): DonutTooltipPosition => {
    const { offsetWidth, offsetHeight } = chart.canvas;

    if (tooltip.caretX > offsetWidth * 0.75) return 'right';
    if (tooltip.caretX < offsetWidth * 0.25) return 'left';
    if (tooltip.caretY > offsetHeight * 0.5) return 'bottom';
    return 'top';
  };

  const _getPositionModifiers = (position: DonutTooltipPosition) => {
    const TOOLTIP_OFFSET = 6;
    const modifiers = {
      offsetX: 0,
      offsetY: 0,
      transform: ''
    };

    switch (position) {
      case 'top':
        modifiers.offsetY = TOOLTIP_OFFSET;
        modifiers.transform = 'translate(-50%, 0)';
        break;

      case 'bottom':
        modifiers.offsetY = -TOOLTIP_OFFSET;
        modifiers.transform = 'translate(-50%, -100%)';
        break;

      case 'left':
        modifiers.offsetX = TOOLTIP_OFFSET;
        modifiers.transform = 'translate(0, -50%)';
        break;

      case 'right':
        modifiers.offsetX = -TOOLTIP_OFFSET;
        modifiers.transform = 'translate(-100%, -50%)';
        break;
    }

    return modifiers;
  };

  return { tooltipOpts, updateTooltip };
};

export default useDonutTooltip;
