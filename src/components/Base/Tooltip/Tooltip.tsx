
import { ReactElement, ReactNode } from 'react';

import { TooltipContainer } from './styles';

interface Props {
  additionalInfo: ReactNode
  children: ReactElement
  disabled?: boolean
  copy?: boolean
  shown?: boolean
  position?: string
}

function Tooltip ({
  additionalInfo,
  children,
  disabled,
  copy,
  shown,
  position = 'top'
}: Props) {
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
