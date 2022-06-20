import { useEffect, useRef } from 'react';

import { createPopper } from '@popperjs/core';

import { TooltipWrapper } from './styles';

function PopperTooltip ({
  placement = 'top',
  trigger,
  disabled = false,
  invertedColors = false,
  style = {},
  children,
}) {
  const triggerEl = useRef(null);
  const popperEl = useRef(null);
  const arrowEl = useRef(null);

  const instance = useRef(null);

  useEffect(() => {
    if (!instance.current || disabled) return;

    instance.current.update();
  }, [children]);

  const showTooltip = () => {
    if (disabled) return;

    instance.current = createPopper(triggerEl.current, popperEl.current, {
      placement,
      modifiers: [
        { name: 'flip', enabled: false },
        { name: 'offset', options: { offset: [0, 6] } },
        { name: 'arrow', options: { element: arrowEl.current } },
      ],
    });
  };

  const hideTooltip = () => {
    instance.current?.destroy();
    instance.current = null;
  };

  return (
    <TooltipWrapper
      style={style}
      $disabled={disabled}
      $invertedColors={invertedColors}
      onMouseOver={showTooltip}
      onMouseLeave={hideTooltip}
    >
      <div
        ref={triggerEl}
        className="tooltip-trigger"
      >
        {trigger}
      </div>

      <div
        ref={popperEl}
        className="tooltip-content"
      >
        {children}

        <div
          ref={arrowEl}
          className="tooltip-arrow"
        />
      </div>
    </TooltipWrapper>
  );
}

export default PopperTooltip;
