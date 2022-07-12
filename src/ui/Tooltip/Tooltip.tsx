import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react';

import { createPopper, Instance, Placement } from '@popperjs/core';

import { TooltipWrapper } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  placement?: Placement
  trigger: ReactNode
  disabled?: boolean
}

function Tooltip ({
  placement = 'top',
  trigger,
  disabled = false,
  children,
  ...rest
}: Props) {
  const triggerEl = useRef<HTMLDivElement | null>(null);
  const popperEl = useRef<HTMLDivElement | null>(null);
  const arrowEl = useRef<HTMLDivElement | null>(null);

  const instance = useRef<Instance | null>(null);

  useEffect(() => {
    if (!instance.current || disabled) return;

    instance.current.update();
  }, [children]);

  const showTooltip = () => {
    if (disabled || !triggerEl.current || !popperEl.current) return;

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
      $disabled={disabled}
      onMouseOver={showTooltip}
      onMouseLeave={hideTooltip}
      {...rest}
    >
      <div
        ref={triggerEl}
        className="tooltip-trigger"
      >
        {trigger}
      </div>

      <div
        ref={popperEl}
        className="tooltip-content text-sm"
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

export default Tooltip;
