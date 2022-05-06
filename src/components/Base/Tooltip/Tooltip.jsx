import React from 'react';

import { TooltipContainer } from './styles';

function Tooltip ({ additionalInfo, children, disabled, copy, shown, position = 'top' }) {
  if (disabled) {
    return children;
  }
  return (
    <>
      <TooltipContainer position={position}>
        {copy || shown
          ? (
            children
          )
          : (
            <>
              <span /> {children}
            </>
          )}
        <span className="tooltip">{additionalInfo}</span>
      </TooltipContainer>
    </>
  );
}

export default Tooltip;
